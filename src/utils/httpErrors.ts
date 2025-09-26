/**
 * Application-specific HTTP error type.
 *
 * Use AppError to represent expected failures (e.g., 404, 409) so the
 * error handler can map them to clean responses without leaking internals.
 */
import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  /**
   * Create an operational error with an HTTP status code.
   * @param message Human-readable message for clients/logs.
   * @param statusCode HTTP status code (defaults to 500).
   */
  constructor(message: string, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}
