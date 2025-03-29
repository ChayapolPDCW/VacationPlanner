import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // ดึง token จาก header Authorization หรือ x-auth-token
        const token = req.header("Authorization")?.replace("Bearer ", "") || req.header("x-auth-token");
        console.log("token: ", token);

        if(!token){
            return res.status(401).json({
                message: "No token provided"
        })
    }
    jwt.verify(token, "SecretKey", (error, decode)=>{
        if(error){ 
            return res.status(401).json({
                message: "Invalid token"
            });
        }else{
            console.log("decode: ", decode);
            req.user = decode;
            next();
        }
    });

    
    }catch(error){
        console.log("Error in authMiddleware: ", error);
        res.status(500).json({
            message: "Unauthorized"
        })
    }
}

