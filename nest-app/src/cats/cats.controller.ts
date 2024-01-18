import { Controller, Get, Query, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CatDto, CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    return await this.catsService.create(createCatDto);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<string> {
    return await this.catsService.update(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.catsService.delete(id);
  }

  @Get()
  async findAll(): Promise<CatDto[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    return await this.catsService.findById(id);
  }
}
