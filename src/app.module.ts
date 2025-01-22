// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './tSender';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramModule
  ],
})
export class AppModule {}