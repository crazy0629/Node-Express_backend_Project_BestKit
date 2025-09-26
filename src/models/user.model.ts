import { Schema, model, Document } from 'mongoose';
import { hashPassword, comparePassword } from '../utils/passwords';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.comparePassword = function (candidate: string) {
  return comparePassword(candidate, this.password);
};

export const User = model<IUser>('User', userSchema);
