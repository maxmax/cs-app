import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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

  async create(createCatDto: CreateCatDto, userId: number): Promise<Cat> {
    const author = await this.usersService.getUserById(userId);

    if (author.id !== userId) {
      throw new NotFoundException('User not found');
    }

    const cat = this.catsRepository.create({
      ...createCatDto,
      createdAt: new Date(),
      authorId: author.id,
      author,
    });

    const savedCat: CatDto = await this.catsRepository.save(cat);
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

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    userId: number,
    role: string,
  ): Promise<Cat> {
    const cat = await this.catsRepository.findOne({ where: { id } });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    // Check if the user is the author of the cat or an admin (then, as a general method, we add it to jwt guard)
    if (role !== 'admin' && cat.authorId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Update cat properties
    cat.name = updateCatDto.name || cat.name;
    cat.breed = updateCatDto.breed || cat.breed;
    cat.imgUrl = updateCatDto.imgUrl || cat.imgUrl;
    cat.content = updateCatDto.content || cat.content;
    cat.age = updateCatDto.age || cat.age;

    const updatedCat = await this.catsRepository.save(cat);
    return updatedCat;
  }

  async remove(id: number, userId: number, role: string): Promise<void> {
    const cat = await this.catsRepository.findOne({ where: { id } });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    // Check if the role & user is the author of the cat or an admin
    if (role !== 'admin' && cat.authorId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.catsRepository.remove(cat);
  }
}
