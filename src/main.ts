import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SanitizePipe } from './pipes/sanitize.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Instantiate ValidationPipe. Will transform incoming data to DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalPipes(new SanitizePipe());
  await app.listen(process.env.PORT ?? 3080);
}
bootstrap();
