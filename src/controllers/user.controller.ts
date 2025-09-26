import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models/user.model';

export async function me(req: Request, res: Response) {
  const id = req.userId!;
  const user = await User.findById(id).select('id email name role createdAt updatedAt');
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  return res.status(StatusCodes.OK).json(user);
}
