import { db } from "../config/db.config.js";

export const getObjectiveHierarchy = async () => {
    const sql = `
    SELECT
        co.objective_title AS companyObjective,
        tobj.objective_title AS teamObjective,
        iobj.objective_title AS individualObjective,
        CONCAT(u.first_name,' ',u.last_name) AS employeeName
    FROM objectives iobj
    LEFT JOIN objectives tobj
        ON iobj.parent_objective_id = tobj.objective_id
    LEFT JOIN objectives co
        ON tobj.parent_objective_id = co.objective_id
    LEFT JOIN users u
        ON iobj.individual_user_id = u.user_id
    WHERE iobj.scope = 'individual'
    `;
    const [rows] = await db.execute(sql);
    return rows;
};

export const createObjective = async (data) => {
    const scope = data.scope?.toLowerCase();

    const sql = `
    INSERT INTO objectives ( 
      company_id, cycle_id, created_by, objective_title, objective_description, 
      scope, organization_id, department_id, team_id, individual_user_id, 
      parent_objective_id, alignment_type, priority, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        data.companyId,
        data.cycleId,
        data.createdBy,
        data.title,
        data.description || null,
        scope,
        scope === 'organization' ? data.organizationId : null,
        scope === 'department' ? data.departmentId : null,
        scope === 'team' ? data.teamId : null,
        scope === 'individual' ? (data.individualId || data.individualUserId) : null,
        data.parentObjectiveId || null,
        data.alignmentType || 'business',
        data.priority || 'medium',
        data.status || 'draft'
    ];

    const [result] = await db.execute(sql, values);
    return result.insertId;
};

// Fetch all objectives globally
export const fetchAllObjectivesFromDb = async () => {
    const [rows] = await db.execute('SELECT * FROM objectives');
    return rows;
};

// Fetch by Individual
export const getObjectivesByIndividual = async (individual_user_id) => {
    const [rows] = await db.execute(
        `SELECT * FROM objectives WHERE scope = 'individual' AND individual_user_id = ?`,
        [parseInt(individual_user_id)]
    );
    return rows;
};

// Fetch by Team
export const getObjectivesByTeam = async (team_id) => {
    const [rows] = await db.execute(
        `SELECT * FROM objectives WHERE scope = 'team' AND team_id = ?`,
        [parseInt(team_id)]
    );
    return rows;
};

// Fetch by Department
export const getObjectivesByDepartment = async (department_id) => {
    const [rows] = await db.execute(
        `SELECT * FROM objectives WHERE scope = 'department' AND department_id = ?`,
        [parseInt(department_id)]
    );
    return rows;
};

// Fetch by Company / Organization
export const getObjectivesByCompany = async (company_id) => {
    const [rows] = await db.execute(
        `SELECT * FROM objectives WHERE scope = 'organization' AND organization_id = ?`,
        [parseInt(company_id)]
    );
    return rows;
};

export const getObjectiveKeyResult = async (objectiveId) => {
    const [rows] = await db.execute(
        'SELECT * FROM key_results WHERE objective_id = ?',
        [objectiveId]
    );
    return rows;
};