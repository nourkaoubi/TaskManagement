// src/tasks/dto/create-task.dto.ts
export class CreateTaskDto {
  title: string;
  description: string;
  status?: string;
}

// src/tasks/dto/update-task.dto.ts
export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
}
