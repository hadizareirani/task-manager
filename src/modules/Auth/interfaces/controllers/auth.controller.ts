import { Body, Controller, Post } from '@nestjs/common';
import {
  SignUpDto,
  LoginDto,
  ForgotPasswordDto,
  ForgotPasswordValidationDto,
} from '../dto';
import {
  SignUpUseCase,
  LoginUseCase,
  ForgotPasswordUseCase,
  ForgotPasswordValidationUseCase,
} from '../../application';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly forgotPasswordValidationUseCase: ForgotPasswordValidationUseCase,
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

  @Post('/forgot-password/validation')
  forgotPasswordValidation(@Body() body: ForgotPasswordValidationDto) {
    return this.forgotPasswordValidationUseCase.execute(body.token);
  }
}
