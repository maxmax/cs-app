import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: Array<{ id: string; name: string }> = [
    { id: '1', name: 'Bazik' },
    { id: '2', name: 'Murzik' },
  ];

  async findAll(): Promise<string> {
    return 'This action returns all cats';
  }

  async findById(id: string): Promise<string> {
    const cat = this.cats.find((c) => c.id === id);
    return cat ? `This action returns a #${cat.id} cat named ${cat.name}` : 'Cat not found';
  }
}
