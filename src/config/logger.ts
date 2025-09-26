/**
 * HTTP request logger configuration.
 *
 * Uses morgan in 'combined' format for production and 'dev' format for
 * development, controlled by NODE_ENV.
 */
import morgan from 'morgan';

import { env } from './env';
/**
 * Express middleware that logs incoming HTTP requests.
 */

export const httpLogger = morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev');
