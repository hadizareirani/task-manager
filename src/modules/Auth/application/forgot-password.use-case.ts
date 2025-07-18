import { Injectable } from '@nestjs/common';

@Injectable()
export class ForgotPasswordUseCase {
  //   constructor(
  //     private readonly createUserService: CreateUserService,
  //     private jwtService: JwtService,
  //   ) {}

  execute(username: string, email: string) {
    return { username, email };
  }
}
