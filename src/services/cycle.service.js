import { db } from "../config/db.config.js";
export const getAllCycle = async () => {
    const [rows] = await db.execute(
        `
        SELECT 
            cycle_id,
            cycle_name,
            cycle_year,
            cycle_quarter,
            start_date,
            end_date,
            status
        FROM okr_cycles
        `
    );

    return rows;
};