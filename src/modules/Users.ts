import mongoose, { Schema } from 'mongoose';

export interface UserType {
  id: string;
  name: string | null | undefined;
  userName: string | null | undefined;
  email: string | null | undefined;
  age: number | null | undefined;
  code: number | null | undefined;
  role?: 'admin' | 'user';
}

export interface User extends UserType {};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema<User>({
  name: { type: String, default: null },
  userName: { type: String, default: null },
  email: {
    type: String,
    default: null,
    unique: true,
    sparse: true,
    validate: {
      validator: (value: string | null | undefined) => {
        if (value === null || value === undefined) return true; 
        return emailRegex.test(value);
      },
      message: 'El email proporcionado no es válido',
    },
  },
  age: { type: Number, default: null },
  code: { type: Number, default: null },
  role: { type: String, enum: ['admin', 'user'], required: true, default: 'user' },
});


export const User = mongoose.model<User>('User', userSchema);
