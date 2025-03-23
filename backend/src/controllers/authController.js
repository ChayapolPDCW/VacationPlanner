import prisma from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Register Create User
export const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // #1 Validate input
        if (!username) {
            return res.status(400).json({
                status: "error",
                message: "Invalid username"
            });
        }
        if (!email) {
            return res.status(400).json({
                status: "error",
                message: "Invalid email address"
            });
        }
        if (!password) {
            return res.status(400).json({
                status: "error",
                message: "Invalid password"
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: "error",
                message: "Passwords do not match"
            });
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
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        const hashedPassword = `${salt}:${hash}`;

        console.log("hashedPassword: ", hashedPassword);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
                // profilePicture is optional and can be omitted since it's not provided in the request
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
                profilePicture: newUser.profilePicture // Include profilePicture (will be null)
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred during registration",
            error: process.env.NODE_ENV === "development" ? error.message : undefined // Include error message in development
        });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // #1 Validate input
        if (!email) {
            return res.status(400).json({
                status: "error",
                message: "Please enter your email"
            });
        }
        if (!password) {
            return res.status(400).json({
                status: "error",
                message: "Please enter your password"
            });
        }

        // #2 Check email in database
        const checkUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!checkUser) {
            return res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }

        // #3 Check password
        const [salt, storedHash] = checkUser.password.split(':');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

        if (storedHash !== hash) {
            return res.status(401).json({
                status: "error",
                message: "Invalid password"
            });
        }

        // #4 Create payload and token
        const payload = {
            id: checkUser.id,
            email: checkUser.email,
            username: checkUser.username
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || "SecretKey", { expiresIn: '1d' });

        // #5 Send response
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                id: checkUser.id,
                username: checkUser.username,
                email: checkUser.email,
                profilePicture: checkUser.profilePicture, // Include profilePicture
                token: token
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred during login",
            error: process.env.NODE_ENV === "development" ? error.message : undefined // Include error message in development
        });
    }
};