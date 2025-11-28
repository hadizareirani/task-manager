import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { SignUpDto } from '../dto/sign-up.dto';
import { LoginDto } from '../dto/login.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ForgotPasswordUseCase } from '../../application/use-cases/forgot-password.use-case';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
  ) {}
  @Post('/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.signUpUseCase.execute(
      body.username,
      body.email,
      body.name,
      body.password,
    );
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.loginUseCase.execute(body.username, body.password);
  }

  @Post('/forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(body.username, body.email);
  }
}
