import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create User (Register)
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "กรุณากรอกข้อมูลให้ครบถ้วน (username, email, password)"
            });
        }

        // Check existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "อีเมลหรือชื่อผู้ใช้นี้มีในระบบแล้ว"
            });
        }

        // Create user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        });

        res.status(201).json({
            status: "success",
            message: "สร้างบัญชีผู้ใช้สำเร็จ",
            data: newUser
        });

    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้",
            error: error.message
        });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        });

        res.status(200).json({
            status: "success",
            data: users
        });

    } catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
            error: error.message
        });
    }
};

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                status: "error",
                message: "รหัสผู้ใช้ไม่ถูกต้อง"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "ไม่พบผู้ใช้นี้ในระบบ"
            });
        }

        res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        console.error("Get user by ID error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
            error: error.message
        });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                status: "error",
                message: "รหัสผู้ใช้ไม่ถูกต้อง"
            });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingUser) {
            return res.status(404).json({
                status: "error",
                message: "ไม่พบผู้ใช้นี้ในระบบ"
            });
        }

        // Prepare update data
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        // Update user
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        });

        res.status(200).json({
            status: "success",
            message: "อัพเดทข้อมูลผู้ใช้สำเร็จ",
            data: updatedUser
        });

    } catch (error) {
        console.error("Update user error:", error);
        if (error.code === 'P2002') {
            return res.status(400).json({
                status: "error",
                message: "อีเมลหรือชื่อผู้ใช้นี้มีในระบบแล้ว"
            });
        }
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการอัพเดทข้อมูลผู้ใช้",
            error: error.message
        });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                status: "error",
                message: "รหัสผู้ใช้ไม่ถูกต้อง"
            });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingUser) {
            return res.status(404).json({
                status: "error",
                message: "ไม่พบผู้ใช้นี้ในระบบ"
            });
        }

        // Delete user
        await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.status(200).json({
            status: "success",
            message: "ลบบัญชีผู้ใช้สำเร็จ"
        });

    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการลบบัญชีผู้ใช้",
            error: error.message
        });
    }
};


