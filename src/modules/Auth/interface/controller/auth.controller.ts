import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUseCase } from '../../application/sign-up.use-case';
import { LoginUseCase } from '../../application/login.use-case';
import { SignUpDto } from '../dto/sign-up.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
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
}
