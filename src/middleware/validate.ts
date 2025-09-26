import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: err.flatten() });
      }
      return next(err);
    }
  };
