/**
 * HTTP server entrypoint.
 *
 * Connects to MongoDB and starts the Express app listening on the configured port.
 * Separated from app.ts to keep side effects (listen) out of the application module
 * for easier testing.
 */
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

/**
 * Bootstraps the database connection and starts the HTTP server.
 */
async function main() {
  await connectDB();
  app.listen(env.PORT, () => {
    // Log a friendly startup message.
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`);
  });
}

void main();
