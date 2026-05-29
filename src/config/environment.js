import dotenv from 'dotenv';
import { logger } from '../middleware/logger.middleware.js';

dotenv.config();

if (!process.env.JWT_SECRET_KEY) {
    logger.error('JWT Secret key is not defined.');
    throw new Error('JWT Secret key is not defined.');
}

if (!process.env.REFRESH_SECRET_KEY) {
    logger.error('Refresh Secret key is not defined.');
    throw new Error('Refresh Secret key is not defined.');
}

export const config = {

    port: process.env.PORT || 3000,

    jwtSecret: process.env.JWT_SECRET_KEY,

    refreshSecret: process.env.REFRESH_SECRET_KEY,

    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',

    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '1d',

    nodeEnvironment: process.env.NODE_ENV || 'development'
};

// export const db_config = {

//     host: process.env.DB_HOST || 'localhost',

//     user: process.env.DB_USER || 'root',

//     password: process.env.DB_PASSWORD,

//     database: process.env.DB_DATABASE_NAME,

//     db_connectionLimit: Number(
//         process.env.DB_CONNECTION_LIMIT || 10
//     )
// };
export const db_config = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    ssl: {
        rejectUnauthorized: true
    }
};