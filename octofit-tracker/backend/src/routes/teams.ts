import { Router, Request, Response, NextFunction } from 'express';
import { Team } from '../models/Team';

export function createTeamRoutes(): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teams = await Team.find({}).sort({ totalPoints: -1 }).lean();
      res.json(teams);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const team = await Team.create(req.body);
      res.status(201).json(team);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
