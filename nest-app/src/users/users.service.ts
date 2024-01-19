import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: any): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ username: userDto.username }, { email: userDto.email }],
    });

    if (existingUser) {
      throw new NotFoundException('Username or email is already taken');
    }

    const user = this.usersRepository.create(userDto as DeepPartial<User>);
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  private async comparePasswords(enteredPassword: string, storedPassword: string): Promise<boolean> {
    return enteredPassword === storedPassword;
  }

  async login(credentials: any): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({ where: { username: credentials.username } });

    if (!user || !(await this.comparePasswords(credentials.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { token };
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
