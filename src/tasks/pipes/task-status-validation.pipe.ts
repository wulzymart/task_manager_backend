import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status-enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedValues = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    if (!value) throw new BadRequestException('Please provide a status');
    value = value.toUpperCase();
    if (!this.allowedValues.includes(value)) {
      throw new BadRequestException(`${value} is not an allowed status`);
    }
    return value;
  }
}
