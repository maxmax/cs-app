import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto, UpdateUserDto, СredentialsUserDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Connect custom JWT Guard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    return this.usersService.register(user);
  }

  @Post('login')
  async login(@Body() credentials: СredentialsUserDto) {
    return this.usersService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Req() request) {
    const role = request.user.role;
    return this.usersService.getAllUsers(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Get('public/:slug')
  async getUserBySlug(@Param('slug') slug: string) {
    return this.usersService.getUserBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Req() request,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const role = request.user.role;
    const userId = request.user.userId;
    return this.usersService.updateUser(id, updateUserDto, role, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Req() request, @Param('id') id: number) {
    const role = request.user.role;
    const userId = request.user.userId;
    return this.usersService.deleteUser(id, role, userId);
  }
}
