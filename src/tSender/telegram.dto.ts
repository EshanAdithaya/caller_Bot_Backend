// src/tSender/telegram.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TelegramCallDto {
  @ApiProperty({
    description: 'Message to be spoken in the call',
    example: 'Hello! This is an urgent notification.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Telegram username of the recipient (with @ symbol)',
    example: '@username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Language for text-to-speech (optional)',
    example: 'en-US-Standard-A',
    required: false,
  })
  @IsString()
  language?: string;
}