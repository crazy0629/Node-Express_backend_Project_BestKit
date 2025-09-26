/**
 * Environment configuration and validation.
 *
 * Loads variables from .env using dotenv and validates them with Zod.
 * If validation fails, the process exits with a helpful error.
 */
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

/**
 * Zod schema describing the required environment variables and their types.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(20, 'JWT_SECRET should be long and random'),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
   
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

/**
 * Strongly-typed, validated environment variables for safe use across the app.
 */
export const env = parsed.data;
