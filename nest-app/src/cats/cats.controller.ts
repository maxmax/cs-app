import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CreateCatDto, GetCatsDto, UpdateCatDto } from './dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  @Get()
  async findAll(@Query() query: GetCatsDto): Promise<Cat[]> {
    return this.catsService.findByParams(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findById(Number(id));
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.update(Number(id), updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(Number(id));
  }
}
