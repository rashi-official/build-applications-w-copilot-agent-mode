import { model, Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focus: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true },
    focus: [{ type: String }],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
