import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SanitizePipe } from './pipes/sanitize.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Instantiate ValidationPipe. Will transform incoming data to DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Sanitize all incoming data
  app.useGlobalPipes(new SanitizePipe());
  // set /api as base path for endpoints
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith('http://localhost')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    //credentials: true, // Allow credentials
  });
  await app.listen(process.env.PORT ?? 3080);
}
bootstrap();
