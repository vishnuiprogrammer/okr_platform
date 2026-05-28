import { logger } from "../middleware/logger.middleware.js";
import { createKeyResults } from "../services/key_result.service.js";
import { updateKeyResultProgressService } from "../services/key_result.service.js";
import { getKeyResultProgressService } from "../services/key_result.service.js";
export const createKeyResult = async (req, res) => {
    try {
        const keyResult = await createKeyResults(req.body);

        logger.info("Key Results created successfully.");
        return res.status(201).json({
            success: true,
            message: "Key Results created successfully",
            data: keyResult
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const updateKeyResultProgress = async (req, res) => {
    try {
        const { keyResultId } = req.params;
        const result = await updateKeyResultProgressService(keyResultId, req.body);

        logger.info("Key Result progress updated successfully.");

        return res.status(200).json({
            success: true,
            message: "Progress updated successfully",
            data: result
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

export const getKeyResultProgress = async (req, res) => {
    try {
        const { keyResultId } = req.params;
        const result = await getKeyResultProgressService(keyResultId);

        logger.info("Key Result progress fetched successfully.");

        return res.status(200).json({
            success: true,
            message: "Progress fetched successfully",
            data: result
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


