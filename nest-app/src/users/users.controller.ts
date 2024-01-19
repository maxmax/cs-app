import { Controller, Post, Body, Get, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto, UpdateUserDto, СredentialsUserDto } from './dto';

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

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
