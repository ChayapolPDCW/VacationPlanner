// const express = require("express");
// const cors = require("cors");
// const pool = require("./db");
// const port = 5432;

// const app = express();
// app.use(express.json());


// app.get("/", async (req, res) => {
//   try {
//     const data = await pool.query(`SELECT * FROM schools`);
//     res.status(200).send({
//       children: data.rows
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       message: "Error creating table"
//     });
//   }
// });


// app.post('/', async (req, res) => {
//   const { name, location} = req.body;
//   try {
//     await pool.query(`INSERT INTO schools (name, address) VALUES ($1, $2)`, [name, location]);
//     res.status(200).send({
//       message: `Successfully added child`,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       message: "Error creating table"
//     });
//   }
// });


// app.get('/setup', async (req, res) => {
//   try {
//     await pool.query(`CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))`);
//     res.status(200).send({
//       message: "Table created successfully"
//     });
//   } catch (err) {
//       console.log(err);
//       res.status(500).send({
//        message: "Error creating table"
//     });
//   }
// });

// app.listen(port, () => console.log(`Server is running on port ${port}`));
