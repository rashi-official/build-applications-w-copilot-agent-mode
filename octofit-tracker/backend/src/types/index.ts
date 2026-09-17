/**
 * Shared application types for the OctoFit Tracker API.
 */

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  teamId?: string;
}

export interface TeamRecord {
  id: string;
  name: string;
  description: string;
  members: string[];
}

export interface ActivityRecord {
  id: string;
  userId: string;
  type: 'running' | 'walking' | 'strength' | 'cycling';
  durationMinutes: number;
  caloriesBurned: number;
  timestamp: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  rank: number;
}

export interface WorkoutSuggestion {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focus: string[];
}
