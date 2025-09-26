/**
 * User Mongoose model.
 *
 * Defines the user schema, including password hashing and a comparison helper.
 */
import { Schema, model, Document } from 'mongoose';

import { hashPassword, comparePassword } from '../utils/passwords';
/**
 * IUser document interface representing a user record.
 */

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  comparePassword(candidate: string): Promise<boolean>;
}
/**
 * Mongoose schema for users.
 */

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);
/**
 * Pre-save hook hashes the password when it has been modified.
 */

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});
/**
 * Compares a plain text password with the stored hash.
 */

userSchema.methods.comparePassword = function (candidate: string) {
  return comparePassword(candidate, this.password);
};
/**
 * User model.
 */

export const User = model<IUser>('User', userSchema);
