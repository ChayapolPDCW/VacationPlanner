import pool from '../config/db.js';

const createUserTable = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `;
        
        await pool.query(createTableQuery);
        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating users table:', error);
        throw error;
    }
};

export default createUserTable;
