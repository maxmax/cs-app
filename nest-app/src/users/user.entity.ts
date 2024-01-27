import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // Let's add a user role
  @Column({ default: 'user' })
  role: string; // 'user' by default, but can be 'admin' for administrators

  @Column()
  imgUrl: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  company: string;

  @Column()
  contacts: string;

  @Column()
  about: string;

  @Column()
  createdAt: Date;
}
