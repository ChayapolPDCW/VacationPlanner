import prisma from "../services/dbService.js";

// Create destination
export const createDestination = async (req, res) => {
    try {
        const { title, latitude, longitude, photoUrl, startDate } = req.body;
        const travelPlanId = req.params.id;

        const destination = await prisma.destination.create({
            data: {
                title,
                latitude,
                longitude,
                photoUrl,
                startDate,
                dailyVisitOrder,
                createdAt,
                travelPlanId: travelPlanId
            }
        });

        res.status(200).json({
            status: "success",
            data: destination
        });
    } catch (error) {
        console.error("Create destination error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create destination"
        });
    }
};

// delete destination

export const deleteDestination = async (req, res) => {
    try {
        const destinationId = req.params.id;
        await prisma.destination.delete({
            where: {
                id: destinationId
            }
        });
        res.status(200).json({
            status: "success",
            message: "Destination deleted successfully"
        });
    } catch (error) {
        console.error("Delete destination error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete destination"
        });
    }
};