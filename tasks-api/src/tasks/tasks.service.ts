// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Create a task
  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, userId });
    return this.tasksRepository.save(task);
  }

  // Get all tasks of a user
  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { userId } });
  }

  // Get a single task
  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  // Update a task
  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<Task> {
    const task = await this.findOne(id, userId);
    if (task) {
      return this.tasksRepository.save({ ...task, ...updateTaskDto });
    }
    throw new Error('Task not found');
  }

  // Delete a task
  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);
    if (task) {
      await this.tasksRepository.remove(task);
    } else {
      throw new Error('Task not found');
    }
  }
}
