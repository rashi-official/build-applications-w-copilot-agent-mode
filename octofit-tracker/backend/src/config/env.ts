import dotenv from 'dotenv';

dotenv.config();

export interface EnvConfig {
  port: number;
  nodeEnv: string;
  appName: string;
  codespaceName?: string;
  frontendOrigin: string;
  apiPrefix: string;
}

const portValue = Number(process.env.PORT ?? '8000');

export const envConfig: EnvConfig = {
  port: Number.isFinite(portValue) ? portValue : 8000,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  appName: process.env.APP_NAME ?? 'OctoFit Tracker',
  codespaceName: process.env.CODESPACE_NAME,
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  apiPrefix: process.env.API_PREFIX ?? '/api',
};
