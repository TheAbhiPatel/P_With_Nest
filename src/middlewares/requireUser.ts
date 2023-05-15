import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequireUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req['user'];

    if (!user) {
      throw new UnauthorizedException('Please login first then try again');
    }
    next();
  }
}
