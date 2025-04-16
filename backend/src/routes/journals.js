import { Router } from "express";
import {
  createJournal,
  deleteJournal,
  getAllJournals,
  getJournalsByID,
  updateJournal,
} from "../controllers/travelPlanController.js";

// นำเข้า prisma สำหรับเข้าถึงฐานข้อมูล
import prisma from "../services/dbService.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  validateCreateTravelPlan,
  validateCreateJournal,
  validateUpdateJournal
} from "../middlewares/validationMiddleware.js";

// นำเข้า multer สำหรับจัดการการอัปโหลดไฟล์
import { imageUpload } from "../services/fsService.js";

const router = Router();

router.get("/user", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "ไม่ได้ล็อกอินหรือเซสชันหมดอายุ"
      });
    }
    
    const userId = req.user.id;
    const journals = await prisma.travelPlanJournal.findMany({
      where: {
        travelPlan: {
          authorId: userId
        }
      },
      include: {
        travelPlan: {
          select: {
            id: true,
            title: true,
            cityTitle: true,
            authorId: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json({
      status: "success",
      data: journals
    });
    
  } catch (error) {
    console.error("Get user journals error:", error);
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลบันทึกการเดินทาง"
    });
  }
});

// ===== Handlers =====
// ใช้ multer ในเส้นทาง API สำหรับสร้าง journal โดยรองรับการอัปโหลดไฟล์หลายไฟล์
router.post("/:id", isAuthenticated, imageUpload.array('photos', 10), createJournal);

router.get("/", getAllJournals);

router.get("/:id",isAuthenticated, getJournalsByID);

router.put("/:id",isAuthenticated, validateUpdateJournal, updateJournal);



router.delete("/:id",isAuthenticated, deleteJournal);

export default router;
