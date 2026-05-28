import express from 'express';
import { getDashboard } from '../controllers/dashboard.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const dashboardRouter = express.Router();

dashboardRouter.get("/", requireAuth, getDashboard);
