import { Injectable } from '@nestjs/common';
import { CatDto, CreateCatDto } from './dto';

@Injectable()
export class CatsService {
  private readonly cats: Array<CatDto> = [
    { id: '1', name: 'Bazik', breed: 'Scottish Fold', age: 2 },
    { id: '2', name: 'Murzik', breed: 'Maine Coon', age: 5},
  ];

  async create(createCatDto: CreateCatDto): Promise<string> {
    // this.cats.push({
    //  id: '3',
    //  ...createCatDto
    // });
    return `This action adds a new cat ${createCatDto.name}`;
  }

  async update(id: string): Promise<string> {
    return `This action update cat ${id}`;
  }

  async delete(id: string): Promise<string> {
    const cat = this.cats.find((c) => c.id === id);
    return cat ? `This action delete cat named ${cat.name} & #${cat.id}` : 'Cat not found';
  }

  async findAll(): Promise<CatDto[]> {
    return this.cats;
  }

  async findById(id: string): Promise<string> {
    const cat = this.cats.find((c) => c.id === id);
    return cat ? `This action returns a #${cat.id} cat named ${cat.name}, cat breed ${cat.breed}` : 'Cat not found';
  }
}
