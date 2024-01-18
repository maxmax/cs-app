import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async create(cat: Cat): Promise<Cat> {
    return this.catsRepository.save(cat);
  }

  async findById(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne({ where: { id } });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    return cat;
  }

  async findByParams(name?: string, breed?: string): Promise<Cat[]> {
    return this.catsRepository.find({
      where: {
        name: Like(`%${name || ''}%`),
        breed: Like(`%${breed || ''}%`),
      },
    });
  }

  async update(id: number, cat: Cat): Promise<Cat> {
    const existingCat = await this.catsRepository.findOne({ where: { id } });

    if (!existingCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    await this.catsRepository.update(id, cat);

    return { ...existingCat, ...cat, id };
  }

  async remove(id: number): Promise<void> {
    const existingCat = await this.catsRepository.findOne({ where: { id } });

    if (!existingCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    await this.catsRepository.remove(existingCat);
  }
}
