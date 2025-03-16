import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors()); 

//error handling
app.use(errorHandling);
// Routes
app.use("/api/user", userRoutes);

// Create user table before starting the server
createUserTable();



// Test database connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send(`Database error: ${error.message}`);
  }
});



// Error handling middleware
app.use(errorHandling);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
