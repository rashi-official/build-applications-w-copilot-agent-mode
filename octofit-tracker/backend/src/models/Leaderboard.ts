import { model, Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: string;
  name: string;
  score: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
