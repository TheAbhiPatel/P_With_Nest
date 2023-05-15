import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeserilizeUser } from './middlewares/deserilizeUser';
import { RequestLogger } from './middlewares/requestLogger';
import { requestLoggerSchema } from './middlewares/schemas/requestLogger.schema';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      { name: 'RequestLog', schema: requestLoggerSchema },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeserilizeUser, RequestLogger).forRoutes('*');
  }
}
