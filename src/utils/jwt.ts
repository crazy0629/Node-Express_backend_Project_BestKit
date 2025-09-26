import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

import { env } from '../config/env';

export function signJwt(subject: string, expiresIn: number = 60 * 60 * 24 * 7) {
  const secret: Secret = env.JWT_SECRET as Secret;
  const options: SignOptions = { expiresIn };
  return jwt.sign({ sub: subject }, secret, options);
}
