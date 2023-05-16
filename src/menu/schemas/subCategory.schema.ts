import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class SubCategory {
  @Prop()
  userId: string;
  @Prop()
  connectId: string;
  @Prop()
  menuId: string;
  @Prop()
  connectMenuId: string;
  @Prop()
  categoryId: string;
  @Prop()
  connectCategoryId: string;
  @Prop()
  name: string;
  @Prop()
  label: string;
  @Prop()
  value: string;
}

export type menuDocument = SubCategory & Document;

export const subCategorySchema = SchemaFactory.createForClass(SubCategory);
