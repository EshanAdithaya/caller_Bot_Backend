import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Notification extends Document {
  @ApiProperty()
  @Prop({ required: true })
  serverId: string;

  @ApiProperty()
  @Prop({ required: true })
  message: string;

  @ApiProperty()
  @Prop({ required: true })
  timestamp: Date;

  @ApiProperty({ default: false })
  @Prop({ default: false })
  callAttempted: boolean;

  @ApiProperty({ default: false })
  @Prop({ default: false })
  callSuccessful: boolean;

  @ApiProperty({ default: false })
  @Prop({ default: false })
  smsAttempted: boolean;

  @ApiProperty({ default: false })
  @Prop({ default: false })
  smsSuccessful: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);