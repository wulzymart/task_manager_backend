import { Inject, Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { TaskRepositotyInterface } from './types/tasks.types';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepositoty: TaskRepositotyInterface,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const task = await this.taskRepositoty.createTask(createTaskDto, user);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return await this.taskRepositoty.getTasks(filterDto, user);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    return await this.taskRepositoty.getTaskById(id, user);
  }
  async deleteTaskById(id: string, user: User) {
    return await this.taskRepositoty.deleteTaskById(id, user);
  }
  async updateStatus(id: string, status: TaskStatus, user: User) {
    return await this.taskRepositoty.updateStatus(id, status, user);
  }
}
