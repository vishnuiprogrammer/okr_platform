import { logger } from "../middleware/logger.middleware.js";
import { createDepartment } from "../services/department.service.js";
import { getAllDeptFromCompany } from "../services/department.service.js";
export const departmentController = async (req, res) => {
    try {
        const deptId = await createDepartment(req.body);

        logger.info("Department created successfully")
        return res.status(201).json({
            status: "success",
            message: "Department created successfully",
            deptId
        });

    } catch (error) {
        logger.error("Error occur while creating department.")
        console.error("Error occur while creating department:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export const getAllDepartments = async (req, res, next) => {
    try {
        const result = await getAllDeptFromCompany();
        if (!result) {
            logger.warn(`Departments fetching failed & not found.`);
            return res.status(404).json({
                status: "error",
                message: "Departments not found"
            });
        }

        logger.info(`Departments successfully retrieved`);
        return res.status(200).json({
            status: "success",
            data: result
        });

    } catch (error) {
        logger.error("Error while accessing objective hierarchy");
        next(error);
    }
};