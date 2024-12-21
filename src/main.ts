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
    origin: 'http://localhost:3000', // Allow specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    //credentials: true, // Allow credentials
  });
  await app.listen(process.env.PORT ?? 3080);
}
bootstrap();
