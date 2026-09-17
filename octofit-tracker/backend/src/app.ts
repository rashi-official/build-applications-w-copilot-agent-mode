import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { envConfig } from './config/env';
import { buildCodespaceUrl } from './utils/codespaces';
import { createApiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: [envConfig.frontendOrigin, buildCodespaceUrl()],
      credentials: true,
    }),
  );

  app.use(express.json());

  app.get('/', (_req: Request, res: Response): void => {
    res.json({
      app: envConfig.appName,
      status: 'ok',
      baseUrl: buildCodespaceUrl(),
      apiPrefix: envConfig.apiPrefix,
    });
  });

  app.use(envConfig.apiPrefix, createApiRouter());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
