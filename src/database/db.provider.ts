import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(typeOrmConfig);

      return dataSource.initialize();
    },
  },
];
