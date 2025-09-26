/**
 * Zod request schemas for auth endpoints.
 */
import { z } from 'zod';

/**
 * Validation for POST /api/auth/register
 */
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

/**
 * Validation for POST /api/auth/login
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});
