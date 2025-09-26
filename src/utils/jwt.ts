import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function signJwt(subject: string, expiresIn: string | number = '7d') {
  return jwt.sign({}, env.JWT_SECRET, { subject, expiresIn });
}
