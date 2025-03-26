import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//create travel plan
export const createTravelPlan = async (req, res) => {
    try{
        const { title, start_date, end_date, visibility } = req.body;
        const user_id = req.user.id;

        const travelPlan = await prisma.travelPlan.create({
            data: {
                title, user_id, start_date, end_date, visibility
            }
        });

        res.status(201).json({
            status: "success",
            message: "Travel plan created successfully",
            data: travelPlan
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to create travel plan",
            error: error.message
        });
    }
}

//get all travel plans
export const getAllTravelPlans = async (req, res) => {
    try{
        const travelPlans = await prisma.travelPlan.findMany();
        res.status(200).json({
            status: "success",
            data: travelPlans
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to get all travel plans",
            error: error.message
        });
    }
}

//get travel plan by id
