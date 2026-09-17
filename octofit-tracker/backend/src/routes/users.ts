import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export function createUserRoutes(): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await User.find({}).sort({ createdAt: -1 }).lean();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.findById(req.params.id).lean();

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
