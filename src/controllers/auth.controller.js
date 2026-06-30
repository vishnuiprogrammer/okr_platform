import { logger } from "../middleware/logger.middleware.js";
import {
    authenticateUser,
    registerUser,
    refreshAccessToken,
    logoutUser
} from "../services/auth.service.js";

export const registerController = async (req, res) => {

    try {

        const userId = await registerUser(req.body);

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            userId
        });

    } catch (error) {

        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const loginController = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await authenticateUser(
            email,
            password
        );

        if (!result) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials"
            });
        }

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: true, //for prod true
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            status: "success",
            accessToken: result.accessToken,
            user: result.user
        });

    } catch (error) {

        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const refreshTokenController = async (req, res) => {

    try {

        const refreshToken = req.cookies.refreshToken;

        const accessToken =
            await refreshAccessToken(refreshToken);

        return res.status(200).json({
            status: "success",
            accessToken
        });

    } catch (error) {

        return res.status(401).json({
            status: "error",
            message: error.message
        });
    }
};

export const logoutController = async (req, res) => {

    try {

        const refreshToken = req.cookies.refreshToken;

        await logoutUser(refreshToken);

        res.clearCookie("refreshToken");

        return res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        });

    } catch (error) {

        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};