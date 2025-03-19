// import pool from "../config/db.js";

// const createTravelPlanTable = async () => {
//     try {
//         const createTableQuery = `
//             CREATE TABLE travel_plans (
//                 id SERIAL PRIMARY KEY,
//                 user_id INT REFERENCES usersdb(id),
//                 title VARCHAR(255) NOT NULL,
//                 start_location VARCHAR(255) NOT NULL,
//                 end_location VARCHAR(255) NOT NULL,
//                 startPlan_date TIMESTAMP NOT NULL,
//                 endPlan_date TIMESTAMP,
//                 duration INTERVAL NOT NULL,
//                 weather_info TEXT,
//                 created_at TIMESTAMP DEFAULT NOW()
//             )`;

//         await pool.query(createTableQuery);
//         console.log("Travel plan table created successfully");
        
//     } catch (error) {
//         console.error("Error creating travel plan table:", error);
//         throw error;
//     }
// };

// export default createTravelPlanTable;
