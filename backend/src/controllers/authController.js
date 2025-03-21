import prisma from "../models/userModel.js";

export const register = async (req, res) => {
    try{ const { username, email, password } = req.body;

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })
    console.log(newUser);

    res.send("This is the register page");

    }catch(error){
        console.log(error);
        res.status(401).json({
            message: "User already exists"
        })
    }
    
    
    
}

export const login = (req, res) => {
    res.send("This is the login page");
}
