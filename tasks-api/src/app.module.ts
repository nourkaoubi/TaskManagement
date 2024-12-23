import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // or your DB type
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123',
      database: 'tasks-api',
      entities: [User, Task],
      synchronize: true, // Set to false in production
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
