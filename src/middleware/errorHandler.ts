import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/httpErrors';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
}
