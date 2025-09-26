/**
 * Auth routes.
 *
 * Exposes endpoints for registration and login with request validation.
 */
import { Router } from 'express';

import { register, login } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();
/** POST /api/auth/register */

/** POST /api/auth/login */
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
