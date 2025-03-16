import pkg from 'pg';
import dotenv from 'dotenv';
const  { Pool }  = pkg;
dotenv.config();

console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database successfully!');
});

export default pool;