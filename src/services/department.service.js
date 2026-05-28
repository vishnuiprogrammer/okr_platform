import { db } from "../config/db.config.js";
import { logger } from "../middleware/logger.middleware.js";

export const createDepartment = async (departmentData) => {
    const company = await findCompanyById(departmentData.companyId);
    if (!company) {
        logger.warn("Company not found while creating department.");
        throw new Error("Company not found");
    }

    const existingDepartment = await findDepartmentByCode(
        departmentData.companyId,
        departmentData.departmentCode
    );
    if (existingDepartment) {
        logger.warn("Department code already exists");
        throw new Error("Department code already exists");
    }

    if (departmentData.parentDepartmentId) {
        const parentDepartment = await findDepartmentById(departmentData.parentDepartmentId);
        if (!parentDepartment) {
            logger.warn("Parent department not found");
            throw new Error("Parent department not found");
        }
    }

    if (departmentData.managerId) {
        const manager = await findUserById(departmentData.managerId);
        if (!manager) {
            logger.warn("Manager not found");
            throw new Error("Manager not found");
        }
    }

    return await create(departmentData);
};

export const getAllDeptFromCompany = async () => {
    const sql = `
    SELECT
        company_id,
        department_name,
        department_code,
        parent_department_id,
        manager_id,
        budget_code,
        location
    FROM departments`;
    const [rows] = await db.execute(sql);
    return rows;
};

const create = async (departmentData) => {
    const [result] = await db.execute(
        `INSERT INTO departments (
            company_id,
            department_name,
            department_code,
            parent_department_id,
            manager_id,
            budget_code,
            location
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            departmentData.companyId,
            departmentData.departmentName,
            departmentData.departmentCode,
            departmentData.parentDepartmentId || null,
            departmentData.managerId || null,
            departmentData.budgetCode || null,
            departmentData.location || null,
        ]
    );
    return result.insertId;
};

const findCompanyById = async (companyId) => {
    const [rows] = await db.execute(
        "SELECT company_id FROM companies WHERE company_id = ?",
        [companyId]
    );
    return rows[0];
};

const findDepartmentByCode = async (companyId, departmentCode) => {
    const [rows] = await db.execute(
        `SELECT department_id FROM departments WHERE company_id = ? AND department_code = ?`,
        [companyId, departmentCode]
    );
    return rows[0];
};

const findDepartmentById = async (departmentId) => {
    const [rows] = await db.execute(
        `SELECT department_id FROM departments WHERE department_id = ?`,
        [departmentId]
    );
    return rows[0];
};

const findUserById = async (userId) => {
    const [rows] = await db.execute(
        `SELECT user_id FROM users WHERE user_id = ?`,
        [userId]
    );
    return rows[0];
};
