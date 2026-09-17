import { Router, Request, Response, NextFunction } from 'express';
import { Leaderboard } from '../models/Leaderboard';

export function createLeaderboardRoutes(): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const leaderboard = await Leaderboard.find({}).sort({ score: -1 }).lean();
      res.json(leaderboard);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
