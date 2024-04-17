import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepositoty: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = this.taskRepositoty.create(createTaskDto);
    await task.save();
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    const { search, status } = filterDto;
    let tasksQuery = this.taskRepositoty.createQueryBuilder('task');

    if (status)
      tasksQuery = tasksQuery.andWhere('task.status = :status', { status });
    if (search)
      tasksQuery = tasksQuery.andWhere(
        'task.title Like :search OR task.description Like :search',
        { search: `%${search}%` },
      );
    const tasks = await tasksQuery.execute();
    return tasks;
  }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepositoty.findOne({
      where: {
        id,
      },
    });
    if (!found) throw new NotFoundException(`Task with id ${id} not found`);
    return found;
  }
  async deleteTaskById(id: string) {
    const deleteResult = await this.taskRepositoty.delete(id);
    if (!deleteResult.affected)
      throw new NotFoundException(`Task with id ${id} not found`);
  }
  async updateStatus(id: string, status: TaskStatus) {
    const task = await this.taskRepositoty.save({ id, status });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }
}
