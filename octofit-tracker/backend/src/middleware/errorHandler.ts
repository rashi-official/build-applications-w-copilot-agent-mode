import { NextFunction, Request, Response } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  const error: AppError = new Error('Resource not found');
  error.statusCode = 404;
  next(error);
}

export function errorHandler(
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({
    message: error.message || 'Internal server error',
    status: statusCode,
  });
}
