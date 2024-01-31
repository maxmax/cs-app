import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Cat } from './cat.entity';
import {
  CatDto,
  CreateCatDto,
  CatsParamsDto,
  GetCatsDto,
  UpdateCatDto,
} from './dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<CatDto[]> {
    const cats = await this.catsRepository.find();
    return cats;
  }

  async create(createCatDto: CreateCatDto, authorId: number): Promise<Cat> {
    const author = await this.usersService.getUserById(authorId);

    if (!author) {
      throw new NotFoundException('User not found');
    }
    // Using `create` instead of `save` in the `create` method
    const cat = this.catsRepository.create({
      ...createCatDto,
      createdAt: new Date(), // Add the createdAt property with the current date
      author,
    });
    const savedCat: Cat = await this.catsRepository.save(cat);
    return savedCat;
  }

  async findById(id: number): Promise<Cat> {
    // Instead of using findOne and manually checking for the presence of the cat, you can use findOneOrFail,
    // which will automatically throw an exception if the cat is not found.
    // return this.catsRepository.findOneOrFail({ where: { id } });
    const cat: Cat = await this.catsRepository.findOne({ where: { id } });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    return cat;
  }

  async findByParams(params: CatsParamsDto): Promise<GetCatsDto> {
    const { page = 1, take = 3, breed = '', order = 'DESC' } = params;
    const skip = (page - 1) * take;

    const [cats, totalCats] = await this.catsRepository.findAndCount({
      where: {
        breed: Like(`%${breed}%`),
      },
      order: {
        createdAt: order as 'ASC' | 'DESC',
      },
      take,
      skip,
    });

    const totalPages = Math.ceil(totalCats / take);

    return { cats, totalPages, totalCats };
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<CatDto> {
    // using `findOneOrFail` instead of `findOne` to automatically throw an exception if cat is not found
    try {
      await this.catsRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    await this.catsRepository.update(id, updateCatDto);

    return { ...updateCatDto, id } as CatDto;
  }

  async remove(id: number): Promise<void> {
    const existingCat = await this.catsRepository.findOne({ where: { id } });

    if (!existingCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    await this.catsRepository.remove(existingCat);
  }
}
