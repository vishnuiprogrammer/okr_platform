import { verifyAccessToken } from "../utils/jwt.utils.js";
import { logger } from "./logger.middleware.js";

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        logger.warn('Authorization denied: Missing token.');
        return res.status(401)
            .json({
                status: "error",
                message: 'Authorization denied: Missing token.'
            });
    }
    const token = authHeader.split(' ')[1]; // 'Bearer token -> access token'
    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded; // Attach payload: id
        next();
    } catch (error) {
        return res.status(403)
            .json({
                message: "Authorization denied: Invalid or expired token"
            });
    }
};