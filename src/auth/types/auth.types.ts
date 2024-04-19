import { Repository } from 'typeorm';
import { UpdatePasswordDto } from '../dto/password-update.dto';
import { SignInCredentialsDto } from '../dto/signIn-credentials.dto';
import { SignUpCredentialsDto } from '../dto/signUp-credentials.dto';
import { User } from '../user.entity';

export interface UpdateSuccessInterface {
  message: string;
  isSuccess: boolean;
}

interface UsersRepositoryExtension {
  signUp: (
    signUpCredentialsDto: SignUpCredentialsDto,
  ) => Promise<Omit<User, 'password'>>;
  signIn: (
    signInCredentialsDto: SignInCredentialsDto,
  ) => Promise<Omit<User, 'password'>>;
  changePassword: (
    updatePasswordDto: UpdatePasswordDto,
  ) => Promise<UpdateSuccessInterface>;
  getOneById: (id: string) => Promise<User | null>;
}

export type UsersRepositoryInterface = Repository<User> &
  UsersRepositoryExtension;

export type JwtPayload = {
  id: string;
  username: string;
};
