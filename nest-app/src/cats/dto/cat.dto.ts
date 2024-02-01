import {
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
  IsObject,
} from 'class-validator';
import { User } from '../../users/user.entity';

export class CatDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  breed: string;

  @IsOptional()
  @IsString()
  imgUrl: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  age: number;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsObject()
  author: User;

  @IsOptional()
  @IsNumber()
  authorId: number;
}
