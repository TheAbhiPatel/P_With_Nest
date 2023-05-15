import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class RequestLog {
  @Prop()
  userId: string;

  @Prop()
  path: string;

  @Prop()
  method: string;

  @Prop()
  ip: string;

  @Prop()
  resCode: string;
}

export const requestLoggerSchema = SchemaFactory.createForClass(RequestLog);
