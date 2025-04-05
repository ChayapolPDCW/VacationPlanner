import prisma from "../services/dbService.js";
import crypto from "crypto";


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
        const { id } = req.params;

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
        // Check if user exists
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

