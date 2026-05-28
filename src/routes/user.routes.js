import express from 'express';
import { getUsers } from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { assignRoleToUser, assignEmployeeToTeam,getMyOkrs } from '../controllers/user.controller.js';
export const userRouter=express.Router();

userRouter.get("/", requireAuth, getUsers);
userRouter.post("/assignRoles",requireAuth,assignRoleToUser);
userRouter.post("/teams",requireAuth,assignEmployeeToTeam);
userRouter.get("/okrs",requireAuth,getMyOkrs)