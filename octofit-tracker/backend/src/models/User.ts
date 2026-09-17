import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  grade: string;
  teamId?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    grade: { type: String, required: true },
    teamId: { type: String },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    totalPoints: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', userSchema);
