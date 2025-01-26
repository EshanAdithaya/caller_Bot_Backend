import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../schemas/server.schema';

export class CreateServerDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: Priority, default: Priority.LOW })
  priority: Priority;

  @ApiProperty({ required: false, default: true })
  active?: boolean;

  @ApiProperty({ required: false })
  failureCount?: number;

  @ApiProperty({ required: false })
  lastError?: string;
}