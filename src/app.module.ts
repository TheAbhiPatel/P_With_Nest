import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MenuController } from './menu/menu.controller';
import { MenuModule } from './menu/menu.module';
import { DeserilizeUser } from './middlewares/deserilizeUser';
import { RequestLogger } from './middlewares/requestLogger';
import { RequireUser } from './middlewares/requireUser';
import { requestLoggerSchema } from './middlewares/schemas/requestLogger.schema';
import { MongooseModelModule } from './mongooseModel.module';
import { UserController } from './user/user.controller';
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
    MongooseModelModule,
    AuthModule,
    UserModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeserilizeUser, RequestLogger).forRoutes('*');
    consumer
      .apply(RequireUser)
      // .exclude('auth')
      .forRoutes(MenuController, UserController);
  }
}
