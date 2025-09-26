/**
 * User routes.
 *
 * Protected endpoints that require authentication.
 */
import { Router } from 'express';

import { me } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();
/** GET /api/users/me */

router.get('/me', requireAuth, me);

export default router;
