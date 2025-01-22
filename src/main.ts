// src/main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Telegram Call API')
    .setDescription('API for sending Telegram voice calls using CallMeBot')
    .setVersion('1.0')
    .addTag('Telegram Calls')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Log that the server is starting
  console.log(`Application is starting on port 3000`);
  
  await app.listen(3000);
}
bootstrap();