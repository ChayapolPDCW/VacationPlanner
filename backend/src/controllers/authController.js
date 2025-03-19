const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2',
            [email, username]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: 'ผู้ใช้งานนี้มีอยู่ในระบบแล้ว'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: 'ลงทะเบียนสำเร็จ',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({
            message: 'เกิดข้อผิดพลาดในการลงทะเบียน'
        });
    }
};
