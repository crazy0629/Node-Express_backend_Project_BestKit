import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

async function main() {
  await connectDB();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`);
  });
}

void main();
