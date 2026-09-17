import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<typeof mongoose> {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }

    await mongoose.connect(connectionString);
    console.log(`Connected to MongoDB at ${connectionString}`);
    return mongoose;
  } catch (error: unknown) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export { connectionString };
