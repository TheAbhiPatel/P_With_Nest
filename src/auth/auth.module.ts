import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userSchema } from './schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // secret: `${process.env.JWT_SECRET}`, // it should be a string here i don't know why
      secret: '' + process.env.JWT_SECRET,
      signOptions: { expiresIn: '5d' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        // host: "smtp.ethereal.email",
        // secure: false,
        auth: {
          user: 'abhishek.patel@stackinfinite.com',
          pass: 'illbekwbvsrfonfr',
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
