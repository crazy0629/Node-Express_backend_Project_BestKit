/**
 * Request validation middleware factory.
 *
 * Wraps a Zod schema to validate req.body, req.query, and req.params.
 * Responds with 400 and details when validation fails.
 */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodTypeAny } from 'zod';

/**
 * Create an Express middleware that validates incoming requests with the given Zod schema.
 * @param schema Zod schema expecting an object with { body, query, params }.
 */
export const validate = (schema: ZodTypeAny) =>
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
