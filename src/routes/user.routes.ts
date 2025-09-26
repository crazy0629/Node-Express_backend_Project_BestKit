import { Router } from 'express';
import { me } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/me', requireAuth, me);

export default router;
