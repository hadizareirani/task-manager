import { Injectable } from '@nestjs/common';
import {
  CompareUserEmailService,
  CreateResetPasswordService,
  FindUserByUsernameService,
} from 'src/modules/User';
import { OperationResponse } from 'src/shared/core/operation-response';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly findUserByUsernameService: FindUserByUsernameService,
    private readonly compareUserEmailService: CompareUserEmailService,
    private readonly createResetPasswordService: CreateResetPasswordService,
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

    const resetPassword =
      await this.createResetPasswordService.createResetPassword(
        hasUser.getValue().email,
        hasUser.getValue().username,
        hasUser.getValue().id,
      );
    if (!resetPassword.isSucceeded()) return resetPassword.getError();

    // Todo: Here you would typically send an email with the reset token to the user.

    return OperationResponse.success(true);
  }
}
