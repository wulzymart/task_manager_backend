import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/task.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
  })
  username: string;
  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
