import { createApp } from './app';
import { connectDatabase } from './config/database';
import { envConfig } from './config/env';

async function startServer(): Promise<void> {
  const app = createApp();

  try {
    await connectDatabase();
    app.listen(envConfig.port, () => {
      console.log(`OctoFit Tracker API running on port ${envConfig.port}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API:', error);
    process.exit(1);
  }
}

startServer();
