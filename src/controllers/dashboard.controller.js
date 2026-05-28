import { getDashboardData } from "../services/dashboard.service.js";
import { logger } from "../middleware/logger.middleware.js";
export const getDashboard = async (req, res) => {
    try {
        const companyId = 1;
        const data = await getDashboardData(companyId);

        res.status(200).json(data);
    } catch (error) {
        logger.warn("Something went wrong while fetching dashboard.")
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
