import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
// Load the environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  const port = process.env.PORT; // Default to 8000 if no PORT is set
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
