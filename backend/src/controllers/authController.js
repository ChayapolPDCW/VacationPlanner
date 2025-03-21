import prisma from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";


// Register Create User
export const register = async (req, res) => {
    try{ 
        const { username, email, password, confirmPassword } = req.body;
        // #1 Validate input
        if (!username) {
            return res.status(400).json({
                status: "error",
                message: "Invalid username"
            })
        }
        if (!email) {
            return res.status(400).json({
                status: "error",
                message: "Invalid email address"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: "error",
                message: "Invalid password"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: "error",
                message: "Password do not match"
            })
        }

        // #2 Check existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({
                    status: "error",
                    message: "Username already exists"
                });
            }
            if (existingUser.email === email) {
                return res.status(400).json({
                    status: "error",
                    message: "Email already exists"
                });
            }
        }

        // #3 Hash password
        const salt = crypto.randomBytes(16).toString('hex'); // สร้าง salt 16 bytes
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        const hashedPassword = `${salt}:${hash}`; // เก็บ salt และ hash ไว้ด้วยกัน โดยคั่นด้วย :

        console.log("hashedPassword: ", hashedPassword);


        // Create user and show data
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword // เก็บ password ที่ถูก hash แล้ว
            }
        });


        // Send response
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }
        });

    } catch(error) {
        console.error("Registration error:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred during registration"
        });
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Please enter your email"
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please enter your password"
            });
        }

        // #1 Check email in database

        const checkUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!checkUser) {
            return res.status(400).json({
                message: "User not found"
            });
        }


        // #2 Check password

        // แยก salt และ hash ที่เก็บในฐานข้อมูล
        const [salt, storedHash] = checkUser.password.split(':');
        
        // สร้าง hash จาก password ที่ผู้ใช้กรอกเข้ามา โดยใช้ salt เดิม
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        
        // เปรียบเทียบ hash
        if (storedHash !== hash) {
            return res.status(401).json({
                status: "error",
                message: "Invalid password"
            });
        }

        // #3 Create payload and token
        const payload = {
            id: checkUser.id,
            email: checkUser.email,
            username: checkUser.username
        }

        const token = jwt.sign(payload, 'SecretKey', { expiresIn: '1d' });

        // #4 Send response
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                id: checkUser.id,
                username: checkUser.username,
                email: checkUser.email,
                token: token
            }
        });

    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred during login"
        });
    }
}
