import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop()
  userId: string;
  @Prop()
  connectId: string;
  @Prop()
  menuId: string;
  @Prop()
  connectMenuId: string;
  @Prop()
  name: string;
  @Prop()
  label: string;
  @Prop()
  value: string;
  @Prop()
  selected: boolean;
}

export type menuDocument = Category & Document;

export const categorySchema = SchemaFactory.createForClass(Category);
