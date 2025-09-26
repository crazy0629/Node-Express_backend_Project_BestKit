import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { httpLogger } from './config/logger';

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

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);

// 404
app.use((_req, res) => res.status(404).json({ message: 'Not found' }));

// Error handler
app.use(errorHandler);

export default app;
