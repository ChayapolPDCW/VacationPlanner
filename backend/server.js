const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON requests

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    process.exit(1); // Exit if database connection fails
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// Test endpoint
app.get('/', (req, res) => {
  res.send('hello from backend!');
});

// Authentication middleware (to protect routes)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

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

// Register endpoint
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
    if (error.code === '23505') { // Unique constraint violation (e.g., duplicate email)
      res.status(400).json({ message: 'Email or username already exists' });
    } else {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }
});

// Login endpoint
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Create plan endpoint (updated for travel_plans table with end_location)
app.post('/api/plans/create', authenticateToken, async (req, res) => {
  const { title, startLocation, endLocation, startTime, endTime } = req.body;
  const userId = req.user.userId; // From JWT

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

// Add itinerary item (updated for place table)
app.post('/api/plans/:planId/itinerary', authenticateToken, async (req, res) => {
  const { planId } = req.params;
  const { placeName, placeType, openTime, closeTime, date, orderIndex, lat, lng } = req.body;
  const userId = req.user.userId;

  try {
    // Verify the plan belongs to the user
    const planResult = await pool.query('SELECT * FROM travel_plans WHERE id = $1 AND user_id = $2', [planId, userId]);
    if (planResult.rows.length === 0) {
      return res.status(403).json({ message: 'Unauthorized to modify this plan' });
    }

    await pool.query(
      'INSERT INTO place (plan_id, place_name, place_type, open_time, close_time, visit_order, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [planId, placeName, placeType, openTime, closeTime, orderIndex, lat, lng]
    );
    res.status(201).json({ message: 'Itinerary item added' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding itinerary item', error: error.message });
  }
});

// Like a plan (updated for like_plans table)
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

// Get public plans (sorted by likes)
app.get('/api/plans/public', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tp.*, COUNT(lp.id) as like_count
      FROM travel_plans tp
      LEFT JOIN like_plans lp ON tp.id = lp.plan_id
      LEFT JOIN travel_journal tj ON tp.id = tj.plan_id
      WHERE tj.is_public = TRUE
      GROUP BY tp.id
      ORDER BY like_count DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public plans', error: error.message });
  }
});

// Create/Update journal (updated for travel_journal table)
app.post('/api/plans/:planId/journal', authenticateToken, async (req, res) => {
  const { planId } = req.params;
  const { title, content, isPublic } = req.body;
  const userId = req.user.userId;

  try {
    const planResult = await pool.query('SELECT * FROM travel_plans WHERE id = $1 AND user_id = $2', [planId, userId]);
    if (planResult.rows.length === 0) {
      return res.status(403).json({ message: 'Unauthorized to modify this plan' });
    }

    await pool.query(
      'INSERT INTO travel_journal (plan_id, user_id, title, content, is_public) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (plan_id) DO UPDATE SET title = $3, content = $4, is_public = $5',
      [planId, userId, title, content, isPublic]
    );
    res.status(201).json({ message: 'Journal saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving journal', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});