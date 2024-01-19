import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userDto: any) {
    return this.usersService.register(userDto);
  }

  @Post('login')
  async login(@Body() credentials: any) {
    return this.usersService.login(credentials);
  }
}
