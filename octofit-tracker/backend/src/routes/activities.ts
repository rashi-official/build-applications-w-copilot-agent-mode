import { Router, Request, Response, NextFunction } from 'express';
import { Activity } from '../models/Activity';

export function createActivityRoutes(): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const activities = await Activity.find({}).sort({ date: -1 }).lean();
      res.json(activities);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const activity = await Activity.create(req.body);
      res.status(201).json(activity);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
