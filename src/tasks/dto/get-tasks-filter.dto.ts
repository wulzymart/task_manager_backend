import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status-enum';
import { Transform } from 'class-transformer';

export class GetTasksFilterDTO {
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
