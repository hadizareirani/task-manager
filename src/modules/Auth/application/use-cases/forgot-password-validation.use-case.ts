import { Injectable } from '@nestjs/common';
import { ResetPasswordValidationService } from 'src/modules/User';
import { OperationResponse } from 'src/shared/core/operation-response';

@Injectable()
export class ForgotPasswordValidationUseCase {
  constructor(
    private readonly resetPasswordValidationService: ResetPasswordValidationService,
  ) {}

  async execute(token: string) {
    // Todo
    const isValidToken =
      await this.resetPasswordValidationService.ResetPasswordValidation(token);
    if (!isValidToken.isSucceeded())
      return OperationResponse.fail(isValidToken.getError());

    return OperationResponse.success(true);
  }
}
