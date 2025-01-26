import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Priority {
  HIGH = 'high',
  LOW = 'low'
}

export type ServerDocument = Server & Document;

@Schema()
export class Server {
  _id: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: Priority, default: Priority.LOW })
  priority: Priority;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  lastCheck: Date;
}

export const ServerSchema = SchemaFactory.createForClass(Server);