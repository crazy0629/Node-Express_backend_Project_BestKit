/**
 * Authentication middleware and request typings.
 *
 * Verifies a Bearer JWT from the Authorization header and attaches the user id
 * to req.userId when valid. Rejects with 401 for missing/invalid tokens.
 */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';

export interface AuthPayload {
  sub: string; // user id
}

/**
 * Augments Express Request with an optional userId, set by requireAuth.
 */
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

/**
 * Ensures the request is authenticated via a Bearer JWT.
 * On success, sets req.userId to the token subject and calls next().
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.userId = payload.sub;
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
}
