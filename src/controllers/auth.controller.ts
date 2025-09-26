/**
 * Authentication controllers.
 *
 * Implements user registration and login using the User model and JWTs.
 */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models/user.model';
import { signJwt } from '../utils/jwt';
/**
 * Register a new user.
 * - Ensures email is unique
 * - Hashes password via model pre-save hook
 * - Returns user id and profile fields (no password)
 */

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body as { email: string; password: string; name: string };
  const existing = await User.findOne({ email });
  if (existing) return res.status(StatusCodes.CONFLICT).json({ message: 'Email in use' });
  const user = await User.create({ email, password, name });
  return res.status(StatusCodes.CREATED).json({ id: user.id, email: user.email, name: user.name });
}
/**
 * Authenticate a user and issue a JWT.
 * - Verifies email/password
 * - Signs a JWT with subject set to the user id
 * - Returns token for use in Authorization: Bearer <token>
 */

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  const token = signJwt(user.id);
  return res.status(StatusCodes.OK).json({ token });
}
