import { getObjectiveHierarchy } from "../services/objective.service.js";
import {
    createObjective,
    getObjectivesByIndividual,
    getObjectivesByTeam,
    getObjectivesByDepartment,
    getObjectivesByCompany,
    fetchAllObjectivesFromDb,
    getObjectiveKeyResult
} from "../services/objective.service.js";
import { logger } from "../middleware/logger.middleware.js";
export const retrieveObjectiveHierarchy = async (req, res, next) => {
    try {
        const result = await getObjectiveHierarchy();
        console.log(result);
        if (!result) {
            logger.warn(`Objective hierarchy fetch failed & not found.`);
            return res.status(404).json({
                status: "error",
                message: "Objective hierarchy not found"
            });
        }

        logger.info(`Objective hierarchy successfully retrieved`);
        return res.status(200).json({
            status: "success",
            data: result
        });

    } catch (error) {
        logger.error("Error while accessing objective hierarchy");
        next(error);
    }
};

export const createObjectives = async (req, res) => {
    try {
        const objectiveId = await createObjective(req.body);

        logger.info("Objectives created successfully")
        return res.status(201).json({
            status: "success",
            message: "Objectives created successfully",
            objectiveId
        });

    } catch (error) {
        logger.error("Error occur while creating objectives.")
        console.error("Error occur while creating objectives:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export const getAllObjectives = async (req, res, next) => {
    try {
        const team_id = req.query.team;
        const department_id = req.query.department;
        const individual_id = req.query.individual;
        const company_id = req.query.company;

        let objectives = [];
        let logMessage = "";

        // find by Individual
        if (individual_id) {
            objectives = await getObjectivesByIndividual(individual_id);
            logMessage = `Individual ID: ${individual_id}`;
        }
        // find by Team
        else if (team_id) {
            objectives = await getObjectivesByTeam(team_id);
            logMessage = `Team ID: ${team_id}`;
        }
        // find by Department
        else if (department_id) {
            objectives = await getObjectivesByDepartment(department_id);
            logMessage = `Department ID: ${department_id}`;
        }
        // find by Company / Organization
        else if (company_id) {
            objectives = await getObjectivesByCompany(company_id);
            logMessage = `Company ID: ${company_id}`;
        }

        else {
            objectives = await fetchAllObjectivesFromDb();
            logMessage = `All objectives`;
        }

        if (!objectives || objectives.length === 0) {
            logger.warn(`Objectives fetching failed: No matching data for ${logMessage}.`);
            return res.status(404).json({
                status: "error",
                message: "No objectives found matching the criteria."
            });
        }

        logger.info(`Objectives accessed successfully for ${logMessage}`);
        return res.status(200).json({
            status: "success",
            results: objectives.length,
            data: objectives
        });

    } catch (error) {
        logger.error(`Error accessing objectives data: ${error.message}`);
        next(error);
    }
};

export const getObjectiveKeyResults = async (req, res, next) => {
    try {
        const objectiveId = req.params.id;
        const result = await getObjectiveKeyResult(objectiveId);
        if (!result) {
            logger.warn(`Objective key results fetch failed & not found.`);
            return res.status(404).json({
                status: "error",
                message: "Objective key results fetch failed & not found"
            });
        }

        logger.info(`Objective key results successfully retrieved`);
        return res.status(200).json({
            status: "success",
            data: result
        });

    } catch (error) {
        logger.error("Error while accessing objective key results");
        next(error);
    }
};