import { Controller, Get, Param } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<string> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    console.log(id);
    return await this.catsService.findById(id);
  }
}
