import prisma from "../services/dbService.js";

export const createDestinationAttachment = async (req, res) => {
    try {
        const destinationId = parseInt(req.params.id);
        const { url, order } = req.body;


        if (!destinationId || !url || !order) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields"
            });
        }

        // ตรวจสอบว่า destination มีอยู่จริง
        const existingDestination = await prisma.travelPlanDestination.findUnique({
            where: {
                id: destinationId
            }
        });

        if (!existingDestination) {
            return res.status(404).json({
                status: "error",
                message: "Destination not found"
            });
        }

        
        const destinationAttachment = await prisma.travelPlanDestinationAttachment.create({
            data: {
                travelPlanDestinationId: destinationId,
                url: url,
                order: parseInt(order)
            }
        });

        res.status(200).json({
            status: "success",
            data: destinationAttachment
        });
    } catch (error) {
        console.error("Create destination attachment error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create destination attachment",
            error: error.message
        });
    }
};

export const deleteDestinationAttachment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Invalid attachment ID"
            });
        }

        const destinationAttachment = await prisma.travelPlanDestinationAttachment.delete({
            where: {
                travelPlanDestinationId: id
            }
        });

        res.status(200).json({
            status: "success",
            data: destinationAttachment
        });
    } catch (error) {
        console.error("Delete destination attachment error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete destination attachment",
            error: error.message
        });
    }
};