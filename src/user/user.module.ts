import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/auth/schemas/user.schema';
import { RequireUser } from 'src/middlewares/requireUser';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequireUser).forRoutes('*');
  }
}
