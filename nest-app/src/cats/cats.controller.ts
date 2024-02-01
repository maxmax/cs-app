import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import {
  CatDto,
  CreateCatDto,
  GetCatsDto,
  CatsParamsDto,
  UpdateCatDto,
} from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() request,
    @Body() createCatDto: CreateCatDto,
  ): Promise<Cat> {
    // Assume the user information is attached to the request
    // You can get the user information from the request, as it should be attached after using JwtAuthGuard
    // Now, you can access request.user.userId
    const userId = request.user.userId;
    // return this.catsService.create(createCatDto, Number(userId));
    return this.catsService.create(createCatDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<CatDto> {
    const userId = request.user.userId;
    const role = request.user.role;
    return this.catsService.update(Number(id), updateCatDto, userId, role);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() request, @Param('id') id: string): Promise<void> {
    const userId = request.user.userId;
    const role = request.user.role;
    return this.catsService.remove(Number(id), userId, role);
  }
}
