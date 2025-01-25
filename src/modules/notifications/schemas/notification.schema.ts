import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  serverId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ default: false })
  callAttempted: boolean;

  @Prop({ default: false })
  callSuccessful: boolean;

  @Prop({ default: false })
  smsAttempted: boolean;

  @Prop({ default: false })
  smsSuccessful: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);