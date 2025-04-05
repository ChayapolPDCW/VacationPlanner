import prisma from "../services/dbService.js";

export const createDestinationAttachment = async (req, res) => {
    try {
        const { travelPlanId, url } = req.body;
        const destinationAttachment = await prisma.destinationAttachment.create({
            data: {
                travelPlanId,
                url
            }
        });
        res.status(200).json({
            status: "success",
            data: destinationAttachment
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to create destination attachment",
            error: error.message
        });
    }
};

export const deleteDestinationAttachment = async (req, res) => {
    try {
        const { id } = req.params;
        const destinationAttachment = await prisma.destinationAttachment.delete({
            where: {
                id
            }
        });
        res.status(200).json({
            status: "success",
            data: destinationAttachment
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete destination attachment",
            error: error.message
        });
    }
};