import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from 'src/modules/User';
import { OperationResponse } from 'src/shared/responses/operation-response';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private jwtService: JwtService,
  ) {}

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
    if (!result.isSucceeded()) return result;
    const token = await this.jwtService.signAsync({ sub: result.getValue() });
    return OperationResponse.success(token);
  }
}
