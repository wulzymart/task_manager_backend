import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { User } from 'src/auth/user.entity';
import { Task } from '../task.entity';
import { GetTasksFilterDTO } from '../dto/get-tasks-filter.dto';
import { TaskStatus } from '../task-status-enum';

export interface TaskRepositotyExtension {
  createTask: (createTaskDto: CreateTaskDto, user: User) => Promise<Task>;
  getTasks: (filterDto: GetTasksFilterDTO, user: User) => Promise<Task[]>;
  getTaskById: (id: string, user: User) => Promise<Task>;
  updateStatus: (id: string, status: TaskStatus, user: User) => Promise<Task>;
  deleteTaskById: (id: string, user: User) => void;
}

export type TaskRepositotyInterface = Repository<Task> &
  TaskRepositotyExtension;
