import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract token from request's header
    const request = context.switchToHttp().getRequest();
    const jwtToken = this.extractTokenFromHeader(request);
    if (!jwtToken) throw new UnauthorizedException();

    try {
      // verify token
      const payload = await this.jwtService.verifyAsync(jwtToken);

      // attach payload to request, then route handler can use it
      request['users'] = payload;
    } catch (error) {
      throw error;
    }
    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    // check type of token must be 'Bearer'
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
