import { IsOptional, IsNumber, IsString } from 'class-validator';
import { CatDto } from './cat.dto';

export class CatsParamsDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  take?: number;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsOptional()
  @IsString()
  order?: string;
}

export class GetCatsDto {
  readonly cats: CatDto[];
  readonly totalPages: number;
  readonly totalCats: number;
}
