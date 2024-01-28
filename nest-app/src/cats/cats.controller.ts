import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CatDto, CreateCatDto, GetCatsDto, CatsParamsDto, UpdateCatDto } from './dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Query() query: CatsParamsDto): Promise<GetCatsDto> {
    return this.catsService.findByParams(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findById(Number(id));
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<CatDto> {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<CatDto> {
    return this.catsService.update(Number(id), updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(Number(id));
  }
}
