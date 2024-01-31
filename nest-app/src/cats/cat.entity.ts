import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

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

  @Column()
  createdAt: Date;

  @Column({ nullable: true }) // Can be null if the cat doesn't have an author (for test)
  authorId: number;

  @ManyToOne(() => User, (user) => user.cats)
  author: User;
}
