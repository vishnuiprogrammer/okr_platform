import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { retrieveObjectiveHierarchy } from '../controllers/objective.controller.js';
import { createObjectives } from '../controllers/objective.controller.js';
import { getAllObjectives } from '../controllers/objective.controller.js';
import { getObjectiveKeyResults } from '../controllers/objective.controller.js';
export const objectiveRouter=express.Router();

objectiveRouter.get("/hierarchy",requireAuth,retrieveObjectiveHierarchy);
objectiveRouter.post("/",requireAuth,createObjectives);
objectiveRouter.get("/",getAllObjectives);
objectiveRouter.get("/:id/key-results",getObjectiveKeyResults);