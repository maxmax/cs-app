import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  RegisterUserDto,
  GetUserDto,
  UpdateUserDto,
  СredentialsUserDto,
  LoginUserDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async comparePasswords(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, storedPassword);
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return this.jwtService.sign(payload);
  }

  async register(registerUser: RegisterUserDto): Promise<GetUserDto> {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: registerUser.username },
        { email: registerUser.email },
      ],
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
    user.createdAt = new Date();
    user.imgUrl = '';
    user.firstName = '';
    user.lastName = '';
    user.company = '';
    user.contacts = '';
    user.about = '';
    // registerUser.role We will use the default role (user) and assign an admin using a different method

    const { id, username, email, role } = await this.usersRepository.save(user);

    // We control the fields that we return to the new user,
    // and perhaps we will also add a token so that it can be immediately authorized after registration
    return {
      id,
      username,
      email,
      role,
    };
  }

  async login(credentials: СredentialsUserDto): Promise<LoginUserDto> {
    const user = await this.usersRepository.findOne({
      where: { email: credentials.email },
    });

    if (
      !user ||
      !(await this.comparePasswords(credentials.password, user.password))
    ) {
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
      token,
    };
  }

  async getAllUsers(role: string): Promise<User[]> {
    // Check role admin
    if (role !== 'admin') {
      throw new NotFoundException('Users not found');
    }
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
    const user = await this.usersRepository.findOne({
      where: { username: slug },
    });

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

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    userId: number,
    role: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (role !== 'admin' && !user && user.id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // We explicitly indicate which fields we want to update
    user.username = updateUserDto.username || user.username;
    user.email = updateUserDto.email || user.email;
    user.imgUrl = updateUserDto.imgUrl || user.imgUrl;
    user.firstName = updateUserDto.firstName || user.firstName;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.company = updateUserDto.company || user.company;
    user.contacts = updateUserDto.contacts || user.contacts;
    user.about = updateUserDto.about || user.about;

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }

  async deleteUser(id: number, userId: number, role: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (role !== 'admin' && !user && user.id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.usersRepository.delete(id);
  }
}
