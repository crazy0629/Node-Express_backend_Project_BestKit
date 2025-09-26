/**
 * Express application configuration.
 *
 * Sets up security middleware (helmet, cors, rate limiting), request parsing,
 * HTTP request logging, health check endpoint, API routes, 404 handler, and
 * centralized error handler. The app instance is exported and started in server.ts.
 */
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { httpLogger } from './config/logger';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

/**
 * The singleton Express app used by the HTTP server.
 */
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/**
 * Lightweight health check for load balancers/monitors.
 */
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);

/**
 * Fallback 404 handler for any unmatched route under the app.
 */
app.use((_req, res) => res.status(404).json({ message: 'Not found' }));

/**
 * Centralized error handler.
 */
app.use(errorHandler);

export default app;
