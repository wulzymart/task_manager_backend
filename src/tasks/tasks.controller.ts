import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDTO,
    @GetUser() user: User,
  ) {
    return this.tasksService.getTasks(filterDto, user);
  }
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() task: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(task, user);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.deleteTaskById(id, user);
  }
  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.updateStatus(id, status, user);
  }
}
