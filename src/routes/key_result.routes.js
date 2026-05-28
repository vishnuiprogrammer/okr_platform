import express from 'express';
import { updateKeyResultProgress, getKeyResultProgress } from '../controllers/key_result.controller.js';
import { createKeyResult } from '../controllers/key_result.controller.js';
export const keyResultRouter=express.Router();

keyResultRouter.post("/",createKeyResult);
keyResultRouter.put("/:keyResultId/progress",updateKeyResultProgress)
keyResultRouter.get("/:keyResultId/progress",getKeyResultProgress)