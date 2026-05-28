import { logger } from "../middleware/logger.middleware.js";
import { getAllCycle } from "../services/cycle.service.js";
export const getAllCycles = async (req, res, next) => {
    try {
        const result = await getAllCycle();

        if (!result || result.length === 0) {
            logger.warn("No cycles found.")
            return res.status(404).json({
                status: "error",
                message: "No cycles found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: result
        });

    } catch (error) {
        next(error);
    }
};