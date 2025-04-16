import prisma from "../services/dbService.js";
import crypto from "crypto";
// ใช้ crypto แทน bcrypt เพื่อแก้ปัญหาการนำเข้าแพ็คเกจใน Docker
// import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";


// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            },
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
        const { id } = req.params.id;

        if (!id || isNaN(parseInt(id))) {
            return res.status(401).json({
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


// TODO : 
// Update User
export const updateUserInfo = async (req, res) => {
    try {
        const { id } = req.params.id;
        const { username, email, avatarUrl } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(401).json({
                status: "error",
                message: "รหัสผู้ใช้ไม่ถูกต้อง"
            });
        }


        const userId = parseInt(id);
   
        const existingUser = await prisma.user.findUnique({
            where: { id: userId}
        });

        console.log(existingUser);
        


        if (!existingUser) {
            return res.status(404).json({
                status: "error",
                message: "ไม่พบผู้ใช้นี้ในระบบ"
            });
        }

        if (!username && !email && !avatarUrl) {
            return res.status(400).json({
                status: "error",
                message: "Nothing to update"
            });
        }
        // Prepare update data
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (avatarUrl) updateData.avatarUrl = avatarUrl;



        if(!username){
            updateData.username = existingUser.username;
        }
        if(!email){
            updateData.email = existingUser.email;
        }
        if(!avatarUrl){
            updateData.avatarUrl = existingUser.avatarUrl;
        }



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


// ดึงข้อมูลโปรไฟล์ของผู้ใช้ที่ล็อกอินอยู่
export const getUserProfile = async (req, res) => {
    try {
        // ตรวจสอบว่ามี req.user หรือไม่
        if (!req.user) {
            console.log("req.user is undefined", req.session);
            return res.status(401).json({
                status: "error",
                message: "ไม่ได้ล็อกอินหรือเซสชันหมดอายุ"
            });
        }
        
        // ดึงข้อมูลผู้ใช้จาก req.user ที่ถูกเพิ่มโดย isAuthenticated middleware
        const userId = req.user.id;

        // ลองดูว่ามีข้อมูลอะไรบ้างใน req.user
        console.log("req.user:", req.user);

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "ไม่พบข้อมูลผู้ใช้"
            });
        }

        res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        console.error("Get user profile error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์"
        });
    }
};

// แก้ไขข้อมูลโปรไฟล์ของผู้ใช้ที่ล็อกอินอยู่
export const updateUserProfile = async (req, res) => {
    try {
        // ตรวจสอบว่ามี req.user หรือไม่
        if (!req.user) {
            console.log("req.user is undefined", req.session);
            return res.status(401).json({
                status: "error",
                message: "ไม่ได้ล็อกอินหรือเซสชันหมดอายุ"
            });
        }
        
        // ดึงข้อมูลผู้ใช้จาก req.user ที่ถูกเพิ่มโดย isAuthenticated middleware
        const userId = req.user.id;
        const { username, avatarUrl, password } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่จะแก้ไขหรือไม่
        if (!username && !avatarUrl && !password) {
            return res.status(400).json({
                status: "error",
                message: "ไม่มีข้อมูลที่จะแก้ไข"
            });
        }

        // สร้างข้อมูลที่จะแก้ไข
        const updateData = {};

        if (username) {
            updateData.username = username;
        }

        if (avatarUrl) {
            updateData.avatarUrl = avatarUrl;
        }

        if (password) {
            // ใช้ crypto แทน bcrypt เพื่อเข้ารหัสรหัสผ่าน
            const salt = crypto.randomBytes(16).toString('hex');
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            updateData.password = `${salt}:${hashedPassword}`;
        }

        // แก้ไขข้อมูลผู้ใช้
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
                createdAt: true,
                updatedAt: true
            }
        });

        res.status(200).json({
            status: "success",
            message: "แก้ไขข้อมูลโปรไฟล์สำเร็จ",
            data: updatedUser
        });

    } catch (error) {
        console.error("Update user profile error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลโปรไฟล์"
        });
    }
};

// อัปโหลดรูปภาพโปรไฟล์
export const uploadUserAvatar = async (req, res) => {
    try {
        // ตรวจสอบว่ามี req.user หรือไม่
        if (!req.user) {
            console.log("req.user is undefined", req.session);
            return res.status(401).json({
                status: "error",
                message: "ไม่ได้ล็อกอินหรือเซสชันหมดอายุ"
            });
        }
        
        // ดึงข้อมูลผู้ใช้จาก req.user ที่ถูกเพิ่มโดย isAuthenticated middleware
        const userId = req.user.id;

        // ตรวจสอบว่ามีไฟล์ที่อัปโหลดหรือไม่
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "ไม่พบไฟล์ที่อัปโหลด"
            });
        }

        // สร้างเส้นทางไฟล์ที่จะบันทึก
        const avatarUrl = `${req.file.filename}`;
        console.log("Uploading avatar to:", req.file.path);
        console.log("Avatar filename:", req.file.filename);

        // ดึงข้อมูลผู้ใช้เพื่อตรวจสอบว่ามีรูปภาพเดิมหรือไม่
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                avatarUrl: true
            }
        });

        // ถ้ามีรูปภาพเดิม ให้ลบรูปภาพเดิมออก
        if (user.avatarUrl) {
            const oldAvatarPath = path.join(process.cwd(), 'uploads/avatars', user.avatarUrl);
            console.log("Trying to delete old avatar at:", oldAvatarPath);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
                console.log("Deleted old avatar");
            } else {
                console.log("Old avatar file not found");
            }
        }

        // แก้ไขข้อมูลผู้ใช้
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatarUrl: avatarUrl
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true
            }
        });

        res.status(200).json({
            status: "success",
            message: "อัปโหลดรูปภาพโปรไฟล์สำเร็จ",
            avatarUrl: avatarUrl,
            data: updatedUser
        });

    } catch (error) {
        console.error("Upload avatar error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพโปรไฟล์"
        });
    }
};

export const updatePassword = async (req, res) => {
    try{
        const {id} = req.params;
        const {oldPassword ,newPassword, confirmNewPassword} = req.body;
        const userId = parseInt(id);
        if(!id || isNaN(parseInt(id))){
            return res.status(401).json({
                status: "error",
                message: "รหัสผู้ใช้ไม่ถูกต้อง"
            });
        }   
        // TODO : Trim password string
        // const trimmedOldPassword = oldPassword.trim();

        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(401).json({
                status: "error",
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                status: "error",
                message: "รหัสผ่านใหม่ไม่ตรงกัน"
            });
        }

        const existingUser = await prisma.user.findFirst({
            where: { id: parseInt(id) }
        });

        const [salt, hash] = existingUser.password.split(":");

        const hashOldPassword = crypto
            .pbkdf2Sync(oldPassword, salt, 1000, 64, "sha512")
            .toString("hex");

        if(hashOldPassword !== hash){
            return res.status(401).json({
                status: "error",
                message: "รหัสผ่านเดิมไม่ถูกต้อง"
            });
        }

        const newSalt = crypto.randomBytes(16).toString("hex");
        const newHash = crypto
            .pbkdf2Sync(newPassword, newSalt, 1000, 64, "sha512")
            .toString("hex");

        const finalHash = `${newSalt}:${newHash}`;
        

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                password: finalHash
            },
        });

        res.status(200).json({
            status: "success",
            message: "อัพเดทรหัสผ่านสำเร็จ",
            data: updatedUser
        });
    }catch(error){
        console.error("Update password error:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการอัพเดทข้อมูลผู้ใช้",
            error: error.message
        });
    }
}

