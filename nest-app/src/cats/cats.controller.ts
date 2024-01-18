import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Query('name') name?: string, @Query('breed') breed?: string): Promise<Cat[]> {
    if (name || breed) {
      return this.catsService.findByParams(name, breed);
    }

    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findById(Number(id));
  }

  @Post()
  async create(@Body() cat: Cat): Promise<Cat> {
    return this.catsService.create(cat);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() cat: Cat): Promise<Cat> {
    return this.catsService.update(Number(id), cat);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(Number(id));
  }
}
