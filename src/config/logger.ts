import morgan from 'morgan';
import { env } from './env';

export const httpLogger = morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev');
