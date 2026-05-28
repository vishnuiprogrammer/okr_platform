import bcrypt from "bcrypt";

import { db } from "../config/db.config.js";

import {
    generateJWTToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt.utils.js";

export const authenticateUser = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user) {
        return null;
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordCorrect) {
        return null;
    }

    const accessToken = generateJWTToken({
        userID: user.user_id
    });

    const refreshToken = generateRefreshToken({
        userID: user.user_id
    });

    await db.execute(
        `INSERT INTO refresh_tokens (user_id, token)
         VALUES (?, ?)`,
        [user.user_id, refreshToken]
    );

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.user_id,
            firstName: user.first_name,
            email: user.email
        }
    };
};

export const refreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {
        throw new Error("Refresh token missing");
    }

    const decoded = verifyRefreshToken(refreshToken);

    const [rows] = await db.execute(
        `SELECT * FROM refresh_tokens
         WHERE token = ?`,
        [refreshToken]
    );

    if (rows.length === 0) {
        throw new Error("Invalid refresh token");
    }

    const accessToken = generateJWTToken({
        userID: decoded.userID
    });

    return accessToken;
};

export const logoutUser = async (refreshToken) => {

    await db.execute(
        `DELETE FROM refresh_tokens
         WHERE token = ?`,
        [refreshToken]
    );
};

export const registerUser = async (userData) => {

    const {
        companyId,
        firstName,
        lastName,
        email,
        password,
        employeeId,
        departmentId,
        primaryTeamId,
        managerId,
        phone,
        jobTitle,
        hireDate
    } = userData;

    const [existingUsers] = await db.execute(
        "SELECT user_id FROM users WHERE email = ?",
        [email]
    );

    if (existingUsers.length > 0) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
        `INSERT INTO users (
            company_id,
            first_name,
            last_name,
            email,
            password_hash,
            employee_id,
            department_id,
            primary_team_id,
            manager_id,
            phone,
            job_title,
            hire_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            companyId,
            firstName,
            lastName,
            email,
            hashedPassword,
            employeeId || null,
            departmentId || null,
            primaryTeamId || null,
            managerId || null,
            phone || null,
            jobTitle || null,
            hireDate || null
        ]
    );

    return result.insertId;
};

const findUserByEmail = async (email) => {

    const [rows] = await db.execute(
        `SELECT
            user_id,
            first_name,
            email,
            password_hash
         FROM users
         WHERE email = ?`,
        [email]
    );

    return rows[0];
};

export const getProfileById = async (id) => {

    const [rows] = await db.execute(
        `SELECT
            user_id,
            company_id,
            first_name,
            last_name,
            email,
            employee_id,
            department_id,
            primary_team_id,
            manager_id,
            phone,
            job_title,
            hire_date,
            created_at
         FROM users
         WHERE user_id = ?`,
        [id]
    );

    return rows[0];
};