import { getProfileById } from "../services/auth.service.js";
import { logger } from "../middleware/logger.middleware.js";
export const accessProfile = async (req, res, next) => {
    try {
        const id = req.user.userID;
        const profile = await getProfileById(id);
        if (!profile) {
            logger.warn(`Profile fetch failed: User ID ${id} not found.`);
            return res.status(404).json({
                status: "error",
                message: "User profile not found"
            });
        }

        logger.info(`Profile accessed successfully for user ID: ${id}`);
        return res.status(200).json({
            status: "success",
            data: profile
        });

    } catch (error) {
        logger.error("Error accessing user profile");
        next(error);
    }
};
