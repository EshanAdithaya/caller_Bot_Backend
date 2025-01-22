// telegram.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  constructor(private configService: ConfigService) {}

  async sendCall(message: string, username: string, language?: string): Promise<any> {
    try {
      const telegramInstance = this.configService.get<string>('TELEGRAM_INSTANCE');
      const apiEndpoint = `http://api.callmebot.com/telegram/call.php`;

      const params = new URLSearchParams({
        text: message,
        user: username,
        lang: language || 'en-US-Standard-A',
        inst: telegramInstance,
      });

      const response = await axios.get(`${apiEndpoint}?${params}`);

      if (response.data.includes('ERROR')) {
        throw new HttpException(response.data, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Call initiated successfully',
        details: response.data,
      };
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to initiate call',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
