import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), UsersModule],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
