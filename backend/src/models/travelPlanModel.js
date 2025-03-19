import pool from "../config/db.js";

export const createTravelPlanService = async (user_id, title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info) => {
    const result = await pool.query("INSERT INTO travel_plans (user_id, title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [user_id, title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info]);
    return result.rows[0];
}

export const getAllUserTravelPlansService = async (user_id) => {
    const result = await pool.query("SELECT * FROM travel_plans WHERE user_id = $1 ORDER BY created_at DESC", [user_id]);
    return result.rows;
}

export const getTravelPlanByIdService = async (id, user_id) => {
    const result = await pool.query("SELECT * FROM travel_plans WHERE id = $1 AND user_id = $2", [id, user_id]);
    return result.rows[0];
}

export const updateTravelPlanService = async (id, user_id, title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info) => {
    const result = await pool.query(`
        UPDATE travel_plans 
        SET title = $1, start_location = $2, end_location = $3, startPlan_date = $4, endPlan_date = $5, duration = $6, weather_info = $7 
        WHERE id = $8 AND user_id = $9 RETURNING *`, [title, start_location, end_location, startPlan_date, endPlan_date, duration, weather_info, id, user_id]);
    return result.rows[0];
}

export const deleteTravelPlanService = async (id, user_id) => {
    const result = await pool.query("DELETE FROM travel_plans WHERE id = $1 AND user_id = $2 RETURNING *", [id, user_id]);
    return result.rows[0];
}
