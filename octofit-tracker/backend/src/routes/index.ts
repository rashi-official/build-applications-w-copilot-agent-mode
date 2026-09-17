import { Router } from 'express';
import { createUserRoutes } from './users';
import { createTeamRoutes } from './teams';
import { createActivityRoutes } from './activities';
import { createLeaderboardRoutes } from './leaderboard';
import { createWorkoutRoutes } from './workouts';

export function createApiRouter(): Router {
  const router = Router();

  router.use('/users', createUserRoutes());
  router.use('/teams', createTeamRoutes());
  router.use('/activities', createActivityRoutes());
  router.use('/leaderboard', createLeaderboardRoutes());
  router.use('/workouts', createWorkoutRoutes());

  return router;
}
