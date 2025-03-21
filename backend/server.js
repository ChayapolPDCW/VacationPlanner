const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Set up storage for uploaded photos
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve uploaded photos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    process.exit(1);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

app.get('/', (req, res) => {
  res.send('hello from backend!');
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'User created', userId: result.rows[0].id });
  } catch (error) {
    if (error.code === '23505') {
      res.status(400).json({ message: 'Email or username already exists' });
    } else {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Fetch user plans
app.get('/api/plans/user', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query('SELECT * FROM travel_plans WHERE user_id = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user plans', error: error.message });
  }
});

app.post('/api/plans/create', authenticateToken, async (req, res) => {
  const { title, startLocation, endLocation, startTime, endTime } = req.body;
  const userId = req.user.userId;

  if (!title || !startLocation || !startTime || !endTime) {
    return res.status(400).json({ message: 'Title, start location, start time, and end time are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO travel_plans (user_id, title, start_location, end_location, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [userId, title, startLocation, endLocation, startTime, endTime]
    );
    res.status(201).json({ planId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan', error: error.message });
  }
});

// Modify the POST /api/plans/:planId/itinerary endpoint to return the place ID
app.post('/api/plans/:planId/itinerary', authenticateToken, async (req, res) => {
  const { planId } = req.params;
  const { placeName, placeType, openTime, closeTime, date, orderIndex, lat, lng } = req.body;
  const userId = req.user.userId;

  try {
    const planResult = await pool.query('SELECT * FROM travel_plans WHERE id = $1 AND user_id = $2', [planId, userId]);
    if (planResult.rows.length === 0) {
      return res.status(403).json({ message: 'Unauthorized to modify this plan' });
    }

    const placeResult = await pool.query(
      'INSERT INTO place (plan_id, place_name, place_type, open_time, close_time, date, visit_order, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [planId, placeName, placeType, openTime, closeTime, date, orderIndex, lat, lng]
    );

    res.status(201).json({ message: 'Itinerary item added', placeId: placeResult.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: 'Error adding itinerary item', error: error.message });
  }
});

// Add a PUT endpoint to update the visit_order of a place
app.put('/api/plans/:planId/itinerary/:placeId', authenticateToken, async (req, res) => {
  const { planId, placeId } = req.params;
  const { visitOrder } = req.body;
  const userId = req.user.userId;

  try {
    const planResult = await pool.query('SELECT * FROM travel_plans WHERE id = $1 AND user_id = $2', [planId, userId]);
    if (planResult.rows.length === 0) {
      return res.status(403).json({ message: 'Unauthorized to modify this plan' });
    }

    await pool.query(
      'UPDATE place SET visit_order = $1 WHERE id = $2 AND plan_id = $3',
      [visitOrder, placeId, planId]
    );

    res.status(200).json({ message: 'Place order updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating place order', error: error.message });
  }
});

app.post('/api/plans/:planId/like', authenticateToken, async (req, res) => {
  const { planId } = req.params;
  const userId = req.user.userId;

  try {
    await pool.query(
      'INSERT INTO like_plans (user_id, plan_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, planId]
    );
    res.status(200).json({ message: 'Plan liked' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking plan', error: error.message });
  }
});

app.get('/api/plans/public', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tp.*, u.username, COUNT(lp.id) as like_count
      FROM travel_plans tp
      JOIN "user" u ON tp.user_id = u.id
      LEFT JOIN like_plans lp ON tp.id = lp.plan_id
      LEFT JOIN travel_journal tj ON tp.id = tj.plan_id
      WHERE tj.is_public = TRUE
      GROUP BY tp.id, u.username
      ORDER BY like_count DESC
      LIMIT 3
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public plans', error: error.message });
  }
});

// Fetch popular places
app.get('/api/places/popular', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.username, tp.start_time, tp.end_time, COUNT(lp.id) as like_count
      FROM place p
      JOIN travel_plans tp ON p.plan_id = tp.id
      JOIN "user" u ON tp.user_id = u.id
      LEFT JOIN like_plans lp ON tp.id = lp.plan_id
      LEFT JOIN travel_journal tj ON tp.id = tj.plan_id
      WHERE tj.is_public = TRUE
      GROUP BY p.id, u.username, tp.start_time, tp.end_time
      ORDER BY like_count DESC
      LIMIT 3
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular places', error: error.message });
  }
});

// Fetch public journals
app.get('/api/journals/public', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tj.*, u.username, tp.title
      FROM travel_journal tj
      JOIN "user" u ON tj.user_id = u.id
      JOIN travel_plans tp ON tj.plan_id = tp.id
      WHERE tj.is_public = TRUE
      ORDER BY tj.created_at DESC
      LIMIT 3
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public journals', error: error.message });
  }
});

app.post('/api/plans/:planId/journal', authenticateToken, upload.array('photos', 10), async (req, res) => {
  const { planId } = req.params;
  const { title, content, isPublic, rating, favoriteMoment, tips } = req.body;
  const userId = req.user.userId;
  const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  try {
    const planResult = await pool.query('SELECT * FROM travel_plans WHERE id = $1 AND user_id = $2', [planId, userId]);
    if (planResult.rows.length === 0) {
      return res.status(403).json({ message: 'Unauthorized to modify this plan' });
    }

    // Insert or update the journal entry
    const journalResult = await pool.query(
      'INSERT INTO travel_journal (plan_id, user_id, title, content, is_public, rating, favorite_moment, tips) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (plan_id) DO UPDATE SET title = $3, content = $4, is_public = $5, rating = $6, favorite_moment = $7, tips = $8 RETURNING id',
      [planId, userId, title, content, isPublic, rating, favoriteMoment, tips]
    );
    const journalId = journalResult.rows[0].id;

    // Insert photos into journal_photo table
    if (photos.length > 0) {
      const photoValues = photos.map(photo => [journalId, photo]);
      await pool.query(
        'INSERT INTO journal_photo (journal_id, photo_url) VALUES ${photoValues.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ')}',
        photoValues.flat()
      );
    }

    res.status(201).json({ message: 'Journal saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving journal', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});