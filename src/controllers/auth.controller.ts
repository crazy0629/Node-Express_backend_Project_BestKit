import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models/user.model';
import { signJwt } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body as { email: string; password: string; name: string };
  const existing = await User.findOne({ email });
  if (existing) return res.status(StatusCodes.CONFLICT).json({ message: 'Email in use' });
  const user = await User.create({ email, password, name });
  return res.status(StatusCodes.CREATED).json({ id: user.id, email: user.email, name: user.name });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  const token = signJwt(user.id);
  return res.status(StatusCodes.OK).json({ token });
}
