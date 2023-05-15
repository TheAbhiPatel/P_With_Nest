import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RequestLog } from './schemas/requestLogger.schema';

@Injectable()
export class RequestLogger implements NestMiddleware {
  constructor(
    @InjectModel(RequestLog.name)
    private requestModel: mongoose.Model<RequestLog>,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { path, method, ip } = req;
    res.on('finish', async () => {
      await this.requestModel.create({
        path,
        method,
        ip,
        resCode: res.statusCode,
        userId: req['user']?.userId,
      });
    });
    next();
  }
}
