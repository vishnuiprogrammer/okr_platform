import express from 'express';
import { updateKeyResultProgress, getKeyResultProgress } from '../controllers/key_result.controller.js';
import { createKeyResult } from '../controllers/key_result.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
export const keyResultRouter = express.Router();

keyResultRouter.post("/", requireAuth, createKeyResult);
keyResultRouter.put("/:keyResultId/progress", requireAuth, updateKeyResultProgress)
keyResultRouter.get("/:keyResultId/progress", requireAuth, getKeyResultProgress)