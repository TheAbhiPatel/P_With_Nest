import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  welcome() {
    return this.userService.getWel();
  }

  @Get('me')
  getMe(@Req() req: Request) {
    const userId = req['user']?.userId;
    return this.userService.getMe(userId);
  }
}
