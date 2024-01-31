import { Controller, Post, Body, Get, Put, Delete, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
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
  async getAllUsers() {
    return this.usersService.getAllUsers();
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
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
