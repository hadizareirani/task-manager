import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserService } from 'src/modules/User';
import { OperationResponse } from 'src/shared/core/operation-response';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly createUserService: CreateUserService,
    private jwtService: JwtService,
  ) {}

  async execute(
    username: string,
    email: string,
    name: string,
    password: string,
  ) {
    const result = await this.createUserService.createUser(
      username,
      email,
      name,
      password,
    );
    if (!result.isSucceeded()) return result.getError();
    const token = await this.jwtService.signAsync({
      sub: result.getValue().id,
    });
    return OperationResponse.success(token);
  }
}
