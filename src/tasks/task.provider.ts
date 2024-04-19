import { Task } from 'src/tasks/task.entity';
import { DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TaskRepositotyInterface } from './types/tasks.types';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource): TaskRepositotyInterface =>
      dataSource.getRepository(Task).extend({
        async createTask(createTaskDto, user) {
          const task: Task = this.create(createTaskDto);
          task.user = user;
          await task.save();
          delete task.user;
          return task;
        },
        async getTasks(filterDto, user) {
          const { search, status } = filterDto;
          const tasksQuery = this.createQueryBuilder('task');
          tasksQuery.where('task.userId = :userId', { userId: user.id });

          if (status)
            tasksQuery.andWhere('task.status = :status', {
              status,
            });
          if (search)
            tasksQuery.andWhere(
              'task.title Like :search OR task.description Like :search',
              { search: `%${search}%` },
            );
          const tasks = await tasksQuery.execute();
          return tasks;
        },
        async getTaskById(id, user) {
          const found = await this.findOne({
            where: {
              id,
              userId: user.id,
            },
          });
          if (!found)
            throw new NotFoundException(`Task with id ${id} not found`);
          return found;
        },
        async deleteTaskById(id, user) {
          const deleteResult = await this.delete({ id, userId: user.id });
          if (!deleteResult.affected)
            throw new NotFoundException(`Task with id ${id} not found`);
        },
        async updateStatus(id, status, user) {
          const task: Task = await this.getTaskById(id, user);
          task.status = status;
          await task.save();
          return task;
        },
      }),
    inject: ['DATA_SOURCE'],
  },
];
