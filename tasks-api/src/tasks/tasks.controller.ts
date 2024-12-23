// src/tasks/tasks.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // Ensure only authenticated users can access
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @GetUser() user: User) {
    return this.tasksService.findOne(id, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @GetUser() user: User) {
    return this.tasksService.remove(id, user.id);
  }
}
