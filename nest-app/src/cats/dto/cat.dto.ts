import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

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
}
