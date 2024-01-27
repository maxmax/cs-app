import { Injectable, UnauthorizedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto, GetUserDto, UpdateUserDto, СredentialsUserDto, LoginUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async comparePasswords(enteredPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, storedPassword);
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return this.jwtService.sign(payload);
  }

  async register(registerUser: RegisterUserDto): Promise<GetUserDto> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ username: registerUser.username }, { email: registerUser.email }],
    });

    if (existingUser) {
      throw new NotFoundException('Username or email is already taken');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerUser.password, saltRounds);

    const user = new User();
    user.username = registerUser.username;
    user.email = registerUser.email;
    user.password = hashedPassword;
    // registerUser.role We will use the default role (user) and assign an admin using a different method

    const {
      id,
      username,
      email,
      role,
    } = await this.usersRepository.save(user);

    // We control the fields that we return to the new user,
    // and perhaps we will also add a token so that it can be immediately authorized after registration
    return {
      id,
      username,
      email,
      role
    };
  }

  async login(credentials: СredentialsUserDto): Promise<LoginUserDto> {
    const user = await this.usersRepository.findOne({ where: { email: credentials.email } });

    if (!user || !(await this.comparePasswords(credentials.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token
    };
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<GetUserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      imgUrl: user.imgUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      contacts: user.contacts,
      about: user.about,
    };
  }

  async getUserBySlug(slug: string): Promise<GetUserDto> {
    const user = await this.usersRepository.findOne({ where: { username: slug } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      imgUrl: user.imgUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      contacts: user.contacts,
      about: user.about,
    };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // TODO: add a check that only the admin can change the role

    // Applying changes from DTO
    Object.assign(user, updateUserDto);

    // Saving the updated user
    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
  }
}
