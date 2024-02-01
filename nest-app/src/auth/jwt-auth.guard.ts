import {
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // In short, super(); in this context is used to call the constructor of the parent class and ensure
  // that the AuthGuard base class is configured correctly.
  constructor(private readonly usersService: UsersService) {
    super();
  }
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
    // const requestedUserId = +request.params.id;
    // If the id parameters are missing or do not match, we throw an access error
    // if (requestedUserId && requestedUserId === user.userId) {
    //  return true;
    // }

    // just checking an authorized user, then we’ll move the verification method section here
    if (user.userId) {
      return true;
    }

    throw new ForbiddenException('Access denied!');
  }
}
