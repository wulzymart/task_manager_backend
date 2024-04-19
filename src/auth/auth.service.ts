import { Inject, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';
import { UpdatePasswordDto } from './dto/password-update.dto';

import { JwtService } from '@nestjs/jwt';
import { UsersRepositoryInterface, JwtPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: UsersRepositoryInterface,
    private jwtService: JwtService,
  ) {}
  signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersRepository.signUp(signUpCredentialsDto);
  }
  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user: Omit<User, 'password'> =
      await this.usersRepository.signIn(signInCredentialsDto);
    const { id, username } = user;
    const payload: JwtPayload = { id, username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
  changePassword(updatePasswordDto: UpdatePasswordDto) {
    return this.usersRepository.changePassword(updatePasswordDto);
  }
}
