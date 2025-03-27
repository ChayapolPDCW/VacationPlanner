import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        console.log("authMiddleware: Headers:", req.headers); // Log all headers
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("authMiddleware: Missing or invalid Authorization header");
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: Invalid or missing Authorization header",
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            console.log("authMiddleware: No token provided");
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: No token provided",
            });
        }

        console.log("authMiddleware: Token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("authMiddleware: Decoded token:", decoded);

        if (!decoded || !decoded.id) {
            console.log("authMiddleware: Invalid token - missing user ID");
            return res.status(403).json({
                status: "error",
                message: "Invalid token: Missing user ID",
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("authMiddleware: Error verifying token:", error.message);
        return res.status(403).json({
            status: "error",
            message: "Invalid token",
            error: error.message,
        });
    }
};