import express from 'express';
import { loginController, registerController, refreshTokenController, logoutController } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { logger } from '../middleware/logger.middleware.js';
import { validateSchema } from '../validations/validate.validations.js';
import { loginSchema, registerSchema } from '../validations/auth.validation.js';
import { accessProfile } from '../controllers/profile.controller.js';
export const authRouter = express.Router();

authRouter.post('/register', validateSchema(registerSchema), registerController);
authRouter.post('/login', validateSchema(loginSchema), loginController);
authRouter.post("/refresh-token", refreshTokenController);
authRouter.post("/logout", logoutController);
authRouter.get('/profile', requireAuth,accessProfile);