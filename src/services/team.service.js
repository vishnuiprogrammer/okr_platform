import { db } from "../config/db.config.js";
import { logger } from "../middleware/logger.middleware.js";

export const createTeam = async (teamData) => {

    const company = await findCompanyById(
        teamData.companyId
    );

    if (!company) {
        logger.warn("Company not found while creating teams.")
        throw new Error("Company not found");
    }

    const department =
        await findDepartmentById(
            teamData.departmentId
        );

    if (!department) {
        logger.warn("Department not found while creating teams.")
        throw new Error("Department not found");
    }

    const existingTeam =
        await findTeamByCode(
            teamData.companyId,
            teamData.teamCode
        );

    if (existingTeam) {
        logger.warn("Team code already exists.")
        throw new Error("Team code already exists");
    }

    if (teamData.parentTeamId) {

        const parentTeam =
            await findTeamById(
                teamData.parentTeamId
            );

        if (!parentTeam) {
            logger.warn("Parent team not found")
            throw new Error("Parent team not found");
        }
    }

    if (teamData.teamLeadId) {

        const teamLead =
            await findUserById(
                teamData.teamLeadId
            );

        if (!teamLead) {
            logger.warn("Team lead not found")
            throw new Error("Team lead not found");
        }
    }

    return await create(teamData);
};

const create = async (data) => {

    const sql = `
    INSERT INTO teams
    (
      company_id,
      department_id,
      team_name,
      team_code,
      parent_team_id,
      team_lead_id,
      team_type,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const [result] = await db.execute(sql, [
        data.companyId,
        data.departmentId,
        data.teamName,
        data.teamCode,
        data.parentTeamId || null,
        data.teamLeadId || null,
        data.teamType || "functional",
        data.description || null
    ]);

    return {
        teamId: result.insertId
    };
};

const findCompanyById = async (companyId) => {
    const [rows] = await db.execute(
        "SELECT company_id FROM companies WHERE company_id = ?",
        [companyId]
    );

    return rows[0];
};

const findDepartmentById = async (departmentId) => {
    const [rows] = await db.execute(
        `
    SELECT department_id
    FROM departments
    WHERE department_id = ?
    `,
        [departmentId]
    );

    return rows[0];
};

const findTeamByCode = async (
    companyId,
    teamCode
) => {

    const [rows] = await db.execute(
        `
    SELECT team_id
    FROM teams
    WHERE company_id = ?
    AND team_code = ?
    `,
        [companyId, teamCode]
    );

    return rows[0];
};

const findTeamById = async (teamId) => {

    const [rows] = await db.execute(
        `
    SELECT team_id
    FROM teams
    WHERE team_id = ?
    `,
        [teamId]
    );

    return rows[0];
};

const findUserById = async (userId) => {

    const [rows] = await db.execute(
        `
    SELECT user_id
    FROM users
    WHERE user_id = ?
    `,
        [userId]
    );

    return rows[0];
};

export const getAllTeamsFromCompany = async () => {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM teams
        `
    );

    return rows;
};