import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';
import { UpdatePasswordDto } from './dto/password-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(@Body(ValidationPipe) authCredentialsdto: SignUpCredentialsDto) {
    return this.authService.signUp(authCredentialsdto);
  }
  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialsdto: SignInCredentialsDto) {
    return this.authService.signIn(authCredentialsdto);
  }
  @Patch('change-password')
  changePassword(@Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto) {
    return this.authService.changePassword(updatePasswordDto);
  }
  @Get('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
