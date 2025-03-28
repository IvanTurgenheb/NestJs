import { UsersService } from 'src/users/users.service';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('토큰이 없습니다!');
    }

    const token = this.authService.extractTokenFromHeader(
      authorizationHeader,
      true,
    );

    const result = await this.authService.verifyToken(token);
    const user = await this.usersService.getUserByEmail(result.email);

    req.user = user;
    req.token = token;
    req.tokenType = result.type;

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'refresh') {
      throw new UnauthorizedException('refresh token이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('access token이 아닙니다.');
    }

    return true;
  }
}
