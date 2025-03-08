// Source: https://docs.nestjs.com/middleware + https://github.com/julien-sarazin/nest-playground/issues/1#issuecomment-682588094

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url, body } = request;
    const contentType = request.get('content-type') || '';
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `request: ${method} ${url} ${statusCode}\nagent: ${userAgent} ${ip}\nbody: ${contentType} ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}
