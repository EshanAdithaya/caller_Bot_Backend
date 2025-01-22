// src/tSender/telegram.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';
import { TelegramCallDto } from './telegram.dto';

@ApiTags('Telegram Calls')
@Controller('telegram')  // Make sure this matches your route
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('call')
  @ApiOperation({ summary: 'Send a Telegram voice call' })
  @ApiResponse({ 
    status: 201, 
    description: 'Call initiated successfully',
    schema: {
      example: {
        success: true,
        message: 'Call initiated successfully',
        details: 'Call request processed'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async sendCall(@Body() telegramCallDto: TelegramCallDto) {
    return await this.telegramService.sendCall(
      telegramCallDto.message,
      telegramCallDto.username,
      telegramCallDto.language,
    );
  }
}