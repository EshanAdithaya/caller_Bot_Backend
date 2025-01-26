import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum Priority {
  HIGH = 'high',
  LOW = 'low'
}

@Schema()
export class Server {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  url: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ enum: Priority })
  @Prop({ type: String, enum: Priority, default: Priority.LOW })
  priority: Priority;

  @ApiProperty()
  @Prop({ default: true })
  active: boolean;

  @ApiProperty()
  @Prop()
  lastCheck: Date;
}

export type ServerDocument = Server & Document;
export const ServerSchema = SchemaFactory.createForClass(Server);