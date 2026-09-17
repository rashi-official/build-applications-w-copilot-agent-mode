import { model, Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: 'running' | 'walking' | 'strength' | 'cycling';
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength', 'cycling'],
      required: true,
    },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Activity = model<IActivity>('Activity', activitySchema);
