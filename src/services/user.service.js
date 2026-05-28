import { db } from "../config/db.config.js";

//Fetch all
export const getAllUsers = async (team_id) => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
};
// Fetch by Team only
export const getUsersByTeam = async (team_id) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE primary_team_id = ?', [team_id]);
    return rows;
};

// Fetch by Department only
export const getUsersByDepartment = async (department_id) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE department_id = ?', [department_id]);
    return rows;
};

// Fetch by BOTH Department and Team
export const getUsersByDepartmentAndTeam = async (department_id, team_id) => {
    const [rows] = await db.execute(
        'SELECT * FROM users WHERE department_id = ? AND primary_team_id = ?',
        [department_id, team_id]
    );
    return rows;
};


export const assignRole = async (currentUserId, userData) => {
    const {
        userId,
        roleId
    } = userData;
    console.log(userId, roleId, currentUserId);

    // Check existing User
    const [existingUsers] = await db.execute(
        "SELECT user_id FROM users WHERE user_id = ?",
        [userId]
    );
    if (currentUserId == userId) {
        throw new Error("You can not assign role to yourself");
    }
    if (existingUsers.length < 0) {
        throw new Error("User not found to assign roles");
    }
    // Assign role to user
    const [result] = await db.execute(
        `INSERT INTO user_roles (
            user_id,
            role_id,
            assigned_by
        ) VALUES (?, ?, ?)`,
        [
            userId,
            roleId,
            currentUserId
        ]
    );

    return result.insertId;
};

export const assignEmployeeToTeams = async (currentUserId, userData) => {
    const {
        userId,
        teamId,
        roleInTeam,
        allocationPercentage
    } = userData;
    console.log(userId, teamId, roleInTeam, allocationPercentage, currentUserId);

    // Check existing User
    const [existingUsers] = await db.execute(
        "SELECT user_id FROM users WHERE user_id = ?",
        [userId]
    );
    if (currentUserId == userId) {
        throw new Error("You can not assign in to teams yourself");
    }
    if (existingUsers.length < 0) {
        throw new Error("User not found to assign into teams");
    }
    // Assign role to user
    const [result] = await db.execute(
        `INSERT INTO user_teams (
            user_id,
            team_id,
            role_in_team,
            allocation_percentage
        ) VALUES (?, ?, ?,?)`,
        [
            userId,
            teamId,
            roleInTeam,
            allocationPercentage
        ]
    );

    return result.insertId;
};

export const fetchMyOkrs = async (userId) => {

    const query = `
    SELECT 
        CONCAT(u.first_name, ' ', u.last_name) AS employee,
        o.objective_id AS objectiveId,
        o.objective_title AS title,
        o.progress_percentage AS progress
    FROM users u
    LEFT JOIN objectives o
        ON u.user_id = o.individual_user_id
    WHERE u.user_id = ?
      AND o.scope = 'individual'
    ORDER BY o.objective_id;
  `;

    const [rows] = await db.execute(query, [userId]);

    if (rows.length === 0) {
        return {
            employee: null,
            objectives: []
        };
    }

    return {
        employee: rows[0].employee,
        objectives: rows.map((row) => ({
            objectiveId: row.objectiveId,
            title: row.title,
            progress: row.progress
        }))
    };
};