import { Body, Controller, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { requireEmailDto } from './dto/requireEmail.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  handleSignup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  @Post('login')
  handleLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('verify-email')
  handleVerifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('resend-verification-email')
  handleResendVerificationEmail(@Body() email: requireEmailDto) {
    return this.authService.resendVerificationEmail(email);
  }

  @Post('forget-password-email')
  handleForgetPasswordEmail(@Body() email: requireEmailDto) {
    return this.authService.forgetPasswordEmail(email);
  }

  @Post('reset-password')
  handleResetPassword(
    @Body('password') password: string,
    @Query('token') token: string,
  ) {
    return this.authService.resetPassword(token, password);
  }
}
