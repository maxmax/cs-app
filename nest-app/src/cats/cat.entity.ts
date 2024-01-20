import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;
  
  @Column()
  imgUrl: string;

  @Column()
  content: string;

  @Column()
  age: number;
}
