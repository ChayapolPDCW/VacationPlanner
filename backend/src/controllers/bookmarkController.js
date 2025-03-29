import prisma from "../services/dbService.js";

// Create bookmark
export const createBookmark = async (req, res) => {
    try {
        const travelPlanId = req.body.travelPlanId;
        const userId = req.user.id;

        const bookmark = await prisma.bookmark.create({
            data: {
                userId,
                travelPlanId
            }
        });

        res.status(200).json({
            status: "success",
            data: bookmark
        });
    } catch (error) {
        console.error("Create bookmark error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create bookmark"
        });
    }
};

// delete bookmark
export const deleteBookmark = async (req, res) => {
    try {
        const travelPlanId = req.body.travelPlanId;
        const userId = req.user.id;

        await prisma.bookmark.delete({
            where: {
                userId_travelPlanId: {
                    userId,
                    travelPlanId
                }
            }
        });

        res.status(200).json({
            status: "success",
            message: "Bookmark deleted successfully"
        });
    } catch (error) {
        console.error("Delete bookmark error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete bookmark"
        });
    }
};