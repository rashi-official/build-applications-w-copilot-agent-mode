import { Router, Request, Response, NextFunction } from 'express';
import { Workout } from '../models/Workout';

export function createWorkoutRoutes(): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const workouts = await Workout.find({}).sort({ durationMinutes: 1 }).lean();
      res.json(workouts);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
