// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './tSender';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Make configuration globally available
    }),
    TelegramModule,
  ],
})
export class AppModule {}