import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}
  getWel() {
    return { message: 'Welcome to user service' };
  }
  async getMe(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password -isVerify');

    return user;
  }
}
