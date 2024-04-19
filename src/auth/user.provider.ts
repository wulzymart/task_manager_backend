import { DataSource } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { getHashedValue } from 'src/lib/utils';
import { UsersRepositoryInterface } from './types/auth.types';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (datasource: DataSource): UsersRepositoryInterface =>
      datasource.getRepository(User).extend({
        async getOneById(id: string): Promise<User | null> {
          return await this.findOneBy({ id });
        },
        async signUp(signUpCredentialsDto) {
          const { password } = signUpCredentialsDto;
          const user: User = this.create(signUpCredentialsDto);
          user.password = await getHashedValue(password);
          try {
            await user.save();
          } catch (error) {
            if (error.code === 'ER_DUP_ENTRY')
              throw new ConflictException('User with same username exists');
            else throw new InternalServerErrorException();
          }
          delete user.password;
          return user;
        },
        async signIn(signInCredentialsDto) {
          const { username, password } = signInCredentialsDto;
          const user: User = await this.findOneBy({ username });
          if (!user)
            throw new UnauthorizedException('Invalid username or password');

          if (!(await user.validatePassword(password)))
            throw new UnauthorizedException('Invalid username or password');
          delete user.password;
          return user;
        },
        async changePassword(updatePasswordDto) {
          const { id, oldPassword, newPassword } = updatePasswordDto;
          const user = await this.findOneBy({ id });
          if (!user) throw new NotFoundException('User not found');
          if (!(await user.validatePassword(oldPassword)))
            throw new UnauthorizedException(
              'Please provide a correct current password',
            );
          user.password = await getHashedValue(newPassword);
          await user.save();
          return { message: 'Password changed', isSuccess: true };
        },
      }),
    inject: ['DATA_SOURCE'],
  },
];
