import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { teamsController, getAllTeams } from '../controllers/team.controller.js';
export const teamRouter = express.Router();

teamRouter.post("/", requireAuth, teamsController);
teamRouter.get("/", requireAuth, getAllTeams);