import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Menu {
  @Prop()
  userId: Types.ObjectId;
  @Prop()
  connectId: string;
  @Prop()
  name: string;
  @Prop()
  label: string;
  @Prop()
  value: string;
  @Prop()
  password: string;
  @Prop()
  isProtected: boolean;
  @Prop()
  selected: boolean;
}

export type menuDocument = Menu & Document;

export const menuSchema = SchemaFactory.createForClass(Menu);
