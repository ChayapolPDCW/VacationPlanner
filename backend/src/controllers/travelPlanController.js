import prisma from "../services/dbService.js";

//create travel plan
export const createTravelPlan = async (req, res) => {
    try{
        const { title, startDate, endDate, visibility, destinations } = req.body;
        const userId = req.user.id;

        // แปลงวันที่เป็น Date object หากจำเป็น
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        // สร้าง travel plan
        const travelPlan = await prisma.travelPlan.create({
            data: {
                title,
                userId,
                startDate: parsedStartDate,
                endDate: parsedEndDate,
                visibility
            }
        });

        // ถ้ามีข้อมูล destinations ให้บันทึกลงใน TravelPlanDestination
        if (destinations && destinations.length > 0) {
            console.log("Processing destinations:", destinations);
            
            for (const destination of destinations) {
                await prisma.travelPlanDestination.create({
                    data: {
                        travelPlanId: travelPlan.id,
                        title: destination.title,
                        latitude: destination.latitude,
                        longitude: destination.longitude,
                        photoUrl: destination.photoUrl,
                        order: destination.order
                    }
                });
            }
        }

        res.status(201).json({
            status: "success",
            message: "Travel plan created successfully",
            data: travelPlan
        });
    }catch(error){
        console.error("Error creating travel plan:", error);
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
export const getTravelPlanById = async (req, res) => {
    try{
        const travelPlan = await prisma.travelPlan.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({
            status: "success",
            data: travelPlan
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to get travel plan by id",
            error: error.message
        });
    }
}
    