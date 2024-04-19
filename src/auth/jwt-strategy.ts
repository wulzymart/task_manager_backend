import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, UsersRepositoryInterface } from './types/auth.types';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: UsersRepositoryInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'this is a test123 Secret for this app',
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const user: User | null = await this.usersRepository.getOneById(payload.id);
    if (!user) throw new UnauthorizedException();
    delete user.password;
    return user;
  }
}
