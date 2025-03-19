// import { createTravelPlanService, getAllUserTravelPlansService, getTravelPlanByIdService, updateTravelPlanService, deleteTravelPlanService } from "../models/travelPlanModel.js";

// const handleResponse = (res, status, message, data = null) => {
//     res.status(status).json({
//         status,
//         message,
//         data
//     });
// }

// export const createTravelPlan = async (req, res, next) => {
//     const { title, user_id, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info } = req.body;
//     try {
//         const newTravelPlan = await createTravelPlanService(user_id, title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info);
//         handleResponse(res, 201, "Travel plan created successfully", newTravelPlan);
//     } catch(err) {
//         next(err);
//     }
// }

// export const getAllUserTravelPlans = async (req, res, next) => {
//     try {
//         // ใช้ req.user.id จาก auth middleware แทน
//         const userId = req.user.id;
//         const travelPlans = await getAllUserTravelPlansService(userId);
//         handleResponse(res, 200, "Travel plans fetched successfully", travelPlans);
//     } catch(err) {
//         next(err);
//     }
// }

// export const getTravelPlanById = async (req, res, next) => {
//     try {
//         const travelPlan = await getTravelPlanByIdService(req.params.id, req.user.id);
//         if(!travelPlan) return handleResponse(res, 404, "Travel plan not found");
//         handleResponse(res, 200, "Travel plan fetched successfully", travelPlan);
//     } catch(err) {
//         next(err);
//     }
// }

// export const updateTravelPlan = async (req, res, next) => {
//     const { title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info } = req.body;
//     try {
//         const updatedTravelPlan = await updateTravelPlanService(req.params.id, req.user.id, title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info);
//         if(!updatedTravelPlan) return handleResponse(res, 404, "Travel plan not found");
//         handleResponse(res, 200, "Travel plan updated successfully", updatedTravelPlan);
//     } catch(err) {
//         next(err);
//     }
// }

// export const deleteTravelPlan = async (req, res, next) => {
//     try {
//         const deletedTravelPlan = await deleteTravelPlanService(req.params.id, req.user.id);
//         if(!deletedTravelPlan) return handleResponse(res, 404, "Travel plan not found");
//         handleResponse(res, 200, "Travel plan deleted successfully", deletedTravelPlan);
//     } catch(err) {
//         next(err);
//     }
// }


