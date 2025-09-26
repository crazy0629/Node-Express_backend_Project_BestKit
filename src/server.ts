import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

async function main() {
  await connectDB();
  app.listen(env.PORT, () => {
     
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`);
  });
}

void main();
