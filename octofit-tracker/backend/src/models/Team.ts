import { model, Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  coach: string;
  description: string;
  totalPoints: number;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    coach: { type: String, required: true },
    description: { type: String, required: true },
    totalPoints: { type: Number, default: 0 },
    members: [{ type: String, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

export const Team = model<ITeam>('Team', teamSchema);
