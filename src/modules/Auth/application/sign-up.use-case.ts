import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/User';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(
    username: string,
    email: string,
    name: string,
    password: string,
  ) {
    const result = await this.createUserUseCase.execute(
      username,
      email,
      name,
      password,
    );
    if (!result.isSucceeded) return result;
  }
}
