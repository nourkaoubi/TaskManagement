// src/tasks/entities/task.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: 'pending' })
  status: string; // Can be "pending", "in progress", "completed"

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number; // Foreign key to associate with a user
}
