/**
 * User controllers.
 *
 * Contains handlers for user-related operations.
 */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models/user.model';
/**
 * Returns the authenticated user's profile.
 * Requires req.userId to be set by the auth middleware.
 */

export async function me(req: Request, res: Response) {
  const id = req.userId!;
  const user = await User.findById(id).select('id email name role createdAt updatedAt');
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  return res.status(StatusCodes.OK).json(user);
}
