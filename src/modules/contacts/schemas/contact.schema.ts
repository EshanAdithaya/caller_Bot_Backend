import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Priority } from '../../servers/schemas/server.schema';

@Schema()
export class Contact extends Document {
  @Prop({ required: true })
  phone: string;

  @Prop({ type: String, enum: Priority, default: Priority.LOW })
  priority: Priority;

  @Prop({ default: true })
  active: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);