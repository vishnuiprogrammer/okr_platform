import express from 'express';
import { getAllCycles } from '../controllers/cycle.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
 export const cycleRouter=express.Router();

 cycleRouter.get("/",requireAuth,getAllCycles);