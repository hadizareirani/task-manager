/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignUpUseCase } from '../../application/sign-up.use-case';

@Controller('/auth')
export class AuthController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}
  @Post('/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.signUpUseCase.execute(
      body.username,
      body.email,
      body.name,
      body.password,
    );
  }
}
