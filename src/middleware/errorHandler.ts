/**
 * Centralized Express error-handling middleware.
 *
 * Converts known AppError instances into structured responses and
 * hides internal details for unexpected errors by returning a generic
 * 500 response.
 */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/httpErrors';

/**
 * Handles any error propagated through next(err) in the middleware chain.
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Log unexpected errors for observability.
  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
}
