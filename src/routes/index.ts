/**
 * API router aggregator.
 *
 * Mounts feature-specific routers under /api.
 */
import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();
/**
 * Auth routes (register, login)
 */

/**
 * User routes (profile, etc.)
 */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
