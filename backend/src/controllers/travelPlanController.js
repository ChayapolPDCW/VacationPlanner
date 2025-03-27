import prisma from "../prisma/client.js";

console.log("Prisma models:", Object.keys(prisma));

//create travel plan
export const createTravelPlan = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not authenticated",
            });
        }

        const { destination, startDate, endDate, itinerary, visibility } = req.body;
        const user_id = req.user.id;

        // Validate required fields
        if (!destination || !startDate || !endDate) {
            return res.status(400).json({
                status: "error",
                message: "Destination, start date, and end date are required",
            });
        }

        const travelPlan = await prisma.travelPlan.create({
            data: {
                user_id,
                destination,
                start_date: new Date(startDate),
                end_date: new Date(endDate),
                itinerary, // Optional field
                visibility: visibility || "private", // Default to "private" if not provided
            },
        });

        res.status(201).json({
            status: "success",
            message: "Travel plan created successfully",
            data: travelPlan,
        });
    } catch (error) {
        console.error("Error creating travel plan:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to create travel plan",
            error: error.message,
        });
    }
}

//get all travel plans
export const getAllTravelPlans = async (req, res) => {
    try {
        const travelPlans = await prisma.travelPlan.findMany();
        res.status(200).json({
            status: "success",
            data: travelPlans,
        });
    } catch (error) {
        console.error("Error getting travel plans:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to get all travel plans",
            error: error.message,
        });
    }
}