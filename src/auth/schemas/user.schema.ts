import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: false,
  })
  isVerify: boolean;
}
export const userSchema = SchemaFactory.createForClass(User);
