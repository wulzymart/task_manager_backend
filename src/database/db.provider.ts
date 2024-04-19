import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

export const dataSource = new DataSource(typeOrmConfig);
export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    return dataSource.initialize();
  },
};
