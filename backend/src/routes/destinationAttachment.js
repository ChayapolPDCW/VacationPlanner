import { Router } from "express";
import { 
    createDestinationAttachment,
    deleteDestinationAttachment,
 } from "../controllers/destinationAttachment.js"

 const router = Router();

 router.post("/:id", createDestinationAttachment);
 
 router.delete("/:id", deleteDestinationAttachment);

 export default router;