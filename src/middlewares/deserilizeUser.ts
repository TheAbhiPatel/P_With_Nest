import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from 'src/utils/verifyJwt';

@Injectable()
export class DeserilizeUser implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token: string;
    const newToken = req?.headers?.authorization?.split(' ');
    if (newToken) {
      if (newToken[0] !== 'Bearer') {
        token = null;
      } else {
        token = newToken[1];
      }
      const decoded = await verifyJwt(this.jwtService, token);
      req['user'] = decoded;
    }

    next();
  }
}
