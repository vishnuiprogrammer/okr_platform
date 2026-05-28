import jwt from "jsonwebtoken";
import { config } from "../config/environment.js";

export const generateJWTToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.refreshSecret, {
        expiresIn: config.refreshExpiresIn
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.refreshSecret);
};