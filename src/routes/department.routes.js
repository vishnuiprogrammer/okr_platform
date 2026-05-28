import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { departmentController, getAllDepartments } from '../controllers/department.controller.js';

export const departmentRouter = express.Router();

departmentRouter.post("/", requireAuth, departmentController);
departmentRouter.get("/", requireAuth, getAllDepartments);