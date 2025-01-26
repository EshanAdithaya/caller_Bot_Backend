import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop()
  phone: string;

  @ApiProperty()
  @Prop({ required: false, type: String, default: null })
  resetToken: string | null;

  @ApiProperty()
  @Prop({ required: false, type: Date, default: null })
  resetTokenExpires: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);