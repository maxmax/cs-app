import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your private key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService so that it is available to other modules
})
export class UsersModule {}
