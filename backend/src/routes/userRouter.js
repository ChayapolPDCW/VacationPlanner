import { Router } from "express";
import { getAllUsers, updateUser, deleteUser} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


// const checkUID = (req, res, next) => {
//     const { id } = req.params;
//     if(id !== req.user.id){
//         return res.status(403).json({
//             message: "You are not authorized to access this resource"
//         });
//     }
//     next();
// }


const router = Router();
router.get("/users", authMiddleware, getAllUsers);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;