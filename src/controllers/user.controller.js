import { logger } from "../middleware/logger.middleware.js";
import {
    getAllUsers,
    getUsersByTeam,
    getUsersByDepartment,
    getUsersByDepartmentAndTeam,
    assignRole,
    assignEmployeeToTeams,
    fetchMyOkrs
} from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
    try {
        const team_id = req.query.team;
        const department_id = req.query.department;

        let users = [];
        let logMessage = "";


        //  Both parameters are provided
        if (department_id && team_id) {
            users = await getUsersByDepartmentAndTeam(department_id, team_id);
            logMessage = `Dept ID: ${department_id} and Team ID: ${team_id}`;
        }
        //  Only team ID is provided
        else if (team_id) {
            users = await getUsersByTeam(team_id);
            logMessage = `Team ID: ${team_id}`;
        }
        // Only department ID is provided
        else if (department_id) {
            users = await getUsersByDepartment(department_id);
            logMessage = `Department ID: ${department_id}`;
        }
        // //  Both parameters are missing
        else {
            users = await getAllUsers();
            logMessage = `All users get fetched`;
        }

        if (!users || users.length === 0) {
            logger.warn(`Users fetching failed: No matching users for ${logMessage}.`);
            return res.status(404).json({
                status: "error",
                message: "No users found matching the criteria."
            });
        }

        logger.info(`Users accessed successfully for ${logMessage}`);
        return res.status(200).json({
            status: "success",
            results: users.length,
            data: users
        });

    } catch (error) {
        logger.error(`Error accessing user data: ${error.message}`);
        next(error);
    }
};


export const assignRoleToUser = async (req, res) => {
    try {
        const currentUserId = req.user.userID;
        console.log(currentUserId);
        const user_roleId = await assignRole(currentUserId, req.body);

        logger.info("Role assigned to user successfully.")
        return res.status(201).json({
            status: "success",
            message: "Role assigned to user successfully",
            user_roleId
        });

    } catch (error) {
        logger.error("Error occur while assigning role to user.")
        console.error("Error occur while assigning role to user.", error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export const assignEmployeeToTeam = async (req, res) => {
    try {
        const currentUserId = req.user.userID;
        console.log(currentUserId);
        const user_teamId = await assignEmployeeToTeams(currentUserId, req.body);

        logger.info("User assigned to team successfully.")
        return res.status(201).json({
            status: "success",
            message: "User assigned to team successfully",
            user_teamId
        });

    } catch (error) {
        logger.error("Error occur while assigning teams to user.")
        console.error("Error occur while assigning teams to user.", error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export const getMyOkrs = async (req, res) => {
    try {

        const userId = 11   ;
        console.log(userId);
        const result = await fetchMyOkrs(userId);

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get My OKRs Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};