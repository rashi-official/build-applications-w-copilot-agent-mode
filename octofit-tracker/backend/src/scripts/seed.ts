import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB for seeding');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@mergington.edu',
        grade: '10',
        teamId: 'storm-squad',
        fitnessLevel: 'intermediate',
        totalPoints: 980,
      },
      {
        name: 'Leo Martinez',
        email: 'leo.martinez@mergington.edu',
        grade: '9',
        teamId: 'iron-pioneers',
        fitnessLevel: 'advanced',
        totalPoints: 940,
      },
      {
        name: 'Nia Patel',
        email: 'nia.patel@mergington.edu',
        grade: '11',
        teamId: 'storm-squad',
        fitnessLevel: 'beginner',
        totalPoints: 810,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@mergington.edu',
        grade: '12',
        teamId: 'iron-pioneers',
        fitnessLevel: 'intermediate',
        totalPoints: 860,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Storm Squad',
        coach: 'Coach Paul Octo',
        description: 'Fast-paced endurance and team challenge specialists.',
        totalPoints: 3240,
        members: users.slice(0, 2).map((user) => user._id.toString()),
      },
      {
        name: 'Iron Pioneers',
        coach: 'Coach Jessica Cat',
        description: 'Strength and consistency focused training group.',
        totalPoints: 3010,
        members: users.slice(2).map((user) => user._id.toString()),
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'running',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date('2026-09-15T07:00:00.000Z'),
        notes: 'Morning 5K practice',
      },
      {
        userId: users[1]._id.toString(),
        type: 'strength',
        durationMinutes: 45,
        caloriesBurned: 360,
        date: new Date('2026-09-16T18:00:00.000Z'),
        notes: 'Full-body session',
      },
      {
        userId: users[2]._id.toString(),
        type: 'walking',
        durationMinutes: 30,
        caloriesBurned: 170,
        date: new Date('2026-09-14T18:30:00.000Z'),
        notes: 'Recovery walk',
      },
      {
        userId: users[3]._id.toString(),
        type: 'cycling',
        durationMinutes: 40,
        caloriesBurned: 310,
        date: new Date('2026-09-13T17:15:00.000Z'),
        notes: 'Bike interval training',
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), name: 'Ava Thompson', score: 980, rank: 1 },
      { userId: users[1]._id.toString(), name: 'Leo Martinez', score: 940, rank: 2 },
      { userId: users[3]._id.toString(), name: 'Marcus Lee', score: 860, rank: 3 },
      { userId: users[2]._id.toString(), name: 'Nia Patel', score: 810, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Cardio Sprint Circuit',
        level: 'beginner',
        durationMinutes: 20,
        focus: ['stamina', 'coordination'],
        description: 'Short intervals to build excitement and endurance safely.',
      },
      {
        title: 'Strength Builder',
        level: 'intermediate',
        durationMinutes: 30,
        focus: ['legs', 'core', 'upper body'],
        description: 'Progressive resistance circuit to build total-body strength.',
      },
      {
        title: 'Recovery Mobility Flow',
        level: 'advanced',
        durationMinutes: 25,
        focus: ['mobility', 'balance', 'flexibility'],
        description: 'Low-impact session to improve range of motion and recovery.',
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts.`);
    console.log('Database seeding complete');
  } catch (error: unknown) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
