import { createApp } from './app';
import { connectDatabase } from './config/database';
import { envConfig } from './config/env';

const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

async function startServer(): Promise<void> {
  const app = createApp();

  try {
    await connectDatabase();
    app.listen(envConfig.port, '0.0.0.0', () => {
      console.log(`OctoFit Tracker API running on port ${envConfig.port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API:', error);
    process.exit(1);
  }
}

startServer();
