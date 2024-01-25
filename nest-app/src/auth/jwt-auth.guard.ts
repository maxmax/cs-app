import { ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === 'admin') {
      return true;
    }

    // Getting the request parameters
    const requestedUserId = +request.params.id;

    // If the id parameters are missing or do not match, we throw an access error
    if (requestedUserId && requestedUserId === user.userId) {
      return true;
    }

    throw new ForbiddenException('Access denied');
  }
}
