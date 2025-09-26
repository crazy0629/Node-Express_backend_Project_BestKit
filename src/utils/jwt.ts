/**
 * JWT utilities.
 *
 * Provides helpers for signing tokens with a standard subject claim.
 */
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

import { env } from '../config/env';
/**
 * Sign a JWT with the given user id as the subject.
 * @param subject User id to embed as the token subject (sub).
 * @param expiresIn Expiration in seconds (default: 7 days).
 */

export function signJwt(subject: string, expiresIn: number = 60 * 60 * 24 * 7) {
  const secret: Secret = env.JWT_SECRET as Secret;
  const options: SignOptions = { expiresIn };
  return jwt.sign({ sub: subject }, secret, options);
}
