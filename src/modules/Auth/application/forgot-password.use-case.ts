import { Injectable } from '@nestjs/common';
import {
  CompareUserEmailService,
  FindUserByUsernameService,
} from 'src/modules/User';
import { OperationResponse } from 'src/shared/core/operation-response';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly findUserByUsernameService: FindUserByUsernameService,
    private readonly compareUserEmailService: CompareUserEmailService,
  ) {}

  async execute(username: string, email: string) {
    const hasUser =
      await this.findUserByUsernameService.findUserByUsername(username);
    if (!hasUser.isSucceeded()) return hasUser.getError();

    const hasValidEmail = this.compareUserEmailService.compare(
      email,
      hasUser.getValue().email,
    );
    if (!hasValidEmail.isSucceeded()) return hasValidEmail.getError();

    return OperationResponse.success(true);
  }
}
