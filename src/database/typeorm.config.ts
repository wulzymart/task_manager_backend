import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'mart',
  password: '',
  database: 'task_manager',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
