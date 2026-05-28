import express from 'express';
import { authRouter } from "./auth.routes.js";
import { objectiveRouter } from "./objective.routes.js";
import { departmentRouter } from "./department.routes.js";
import { teamRouter } from "./team.routes.js";
import { userRouter } from "./user.routes.js";
import { cycleRouter } from "./cycle.routes.js";
import { keyResultRouter } from "./key_result.routes.js";
import { dashboardRouter } from "./dashboard.routes.js";

export const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/objectives", objectiveRouter);
apiRouter.use("/departments", departmentRouter);
apiRouter.use("/teams", teamRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/cycles", cycleRouter);
apiRouter.use("/key-results", keyResultRouter);
apiRouter.use("/dashboard", dashboardRouter);
