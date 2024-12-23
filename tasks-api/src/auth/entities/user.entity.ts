import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
