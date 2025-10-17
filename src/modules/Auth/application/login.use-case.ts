import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserByUsernameService, Password } from 'src/modules/User';
import { OperationResponse } from 'src/shared/core/operation-response';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserByUsernameService: FindUserByUsernameService,
    private jwtService: JwtService,
  ) {}
  async execute(username: string, password: string) {
    const hasUser =
      await this.findUserByUsernameService.findUserByUsername(username);

    if (!hasUser.isSucceeded()) return hasUser.getError();

    const isValidPassword = await Password.isValid(
      password,
      username,
      hasUser.getValue().password,
    );
    if (isValidPassword.isFailure) {
      return OperationResponse.fail(isValidPassword.getError());
    }

    const token = await this.jwtService.signAsync({
      sub: hasUser.getValue().id,
    });

    return OperationResponse.success(token);
  }
}
