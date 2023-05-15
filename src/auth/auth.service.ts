import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { requireEmailDto } from './dto/requireEmail.dto';
import { verifyJwt } from 'src/utils/verifyJwt';
import { PasswordDto } from './dto/password.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
    private mailService: MailerService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.userModel.findOne({ email: signupDto.email });
    if (user) {
      throw new NotAcceptableException('User already registered');
    }
    const hashPass = await bcrypt.hash(signupDto.password, 10);
    const newUser = await this.userModel.create({
      ...signupDto,
      password: hashPass,
    });
    const payload = { userId: newUser._id };
    const verificationToken = await this.jwtService.signAsync(payload);
    await this.mailService.sendMail({
      to: newUser.email,
      from: 'the@gmail.com',
      subject: 'Email verification mail from The',
      html: `<h1>This is the email verification mail please verify your mail this is token - </h1> <br> <p>${verificationToken}</p>`,
    });

    return {
      success: true,
      message: 'User registered successfully, Please verify your email',
      newUser,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isVerify !== true) {
      throw new UnauthorizedException(
        'User is not verfied, please verify your email',
      );
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('password is not match');
    }
    const payload = { userId: user._id };
    const token = await this.jwtService.signAsync(payload);

    return { success: true, message: 'User loggedIn successfully', token };
  }

  async verifyEmail(tokenDto: TokenDto) {
    const decoded = await verifyJwt(this.jwtService, tokenDto.token);
    if (!decoded) {
      throw new UnauthorizedException('Token is not valid or expired');
    }
    const user = await this.userModel.findById(decoded.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isVerify = true;
    user.save();
    return { success: true, message: 'Email is verified successfully' };
  }

  async resendVerificationEmail({ email }: requireEmailDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isVerify === true) {
      throw new NotAcceptableException('User is already verfied');
    }
    const payload = { userId: user._id };
    const verificationToken = await this.jwtService.signAsync(payload);
    await this.mailService.sendMail({
      to: user.email,
      from: 'the@gmail.com',
      subject: 'Mail for Email Verification from The..',
      html: `<h1>This is the email verification mail please verify your mail this is token - </h1> <br> <p>${verificationToken}</p>`,
    });
    return { success: true, message: 'Verification email sent successfully' };
  }
  // this is the comment
  // * this is the comment
  // ? this is the comment
  // ! this is the comment
  async forgetPasswordEmail({ email }: requireEmailDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isVerify !== true) {
      throw new UnauthorizedException(
        'User is not verfied, please verify your email first',
      );
    }
    const payload = { userId: user._id };
    const verificationToken = await this.jwtService.signAsync(payload);
    await this.mailService.sendMail({
      to: user.email,
      from: 'the@gmail.com',
      subject: 'Email for Forget Password from The..',
      html: `<h1>This is the email for forget password, <br> please keep your password safe - </h1> <br> <p>${verificationToken}</p>`,
    });
    return {
      success: true,
      message: 'Forget password email sent successfully',
    };
  }

  async resetPassword(tokenDto: TokenDto, passwordDto: PasswordDto) {
    const decoded = await verifyJwt(this.jwtService, tokenDto.token);

    if (!decoded) {
      throw new UnauthorizedException('Token is not valid or expired');
    }
    const user = await this.userModel.findById(decoded.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashPass = await bcrypt.hash(passwordDto.password, 10);
    user.password = hashPass;
    user.save();
    return {
      success: true,
      message: 'Password reset successfully',
    };
  }
}
