/**
 * Mongoose connection helper.
 *
 * Exposes a function that connects to the MongoDB instance using the
 * validated connection string from env.
 */
import mongoose from 'mongoose';

import { env } from './env';
/**
 * Connect to MongoDB using the configured connection string.
 * @returns The connected mongoose instance.
 */

export async function connectDB(): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true);
  return mongoose.connect(env.MONGO_URI);
}
