import { logger } from "../middleware/logger.middleware.js";
import { createTeam, getAllTeamsFromCompany } from "../services/team.service.js";
export const teamsController = async (req, res) => {
    try {
        const team = await createTeam(req.body);

        logger.info("Team created successfully.")
        return res.status(201).json({
            success: true,
            message: "Team created successfully",
            data: team
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const getAllTeams = async (req, res, next) => {
    try {
        const result = await getAllTeamsFromCompany();

        if (!result || result.length === 0) {
            logger.warn("No teams found.")
            return res.status(404).json({
                status: "error",
                message: "No teams found"
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