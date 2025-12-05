import { Inject, Injectable } from '@nestjs/common';
// import { randomBytes } from 'crypto';
import {
  // Email,
  // ResetPassword,
  ResetPasswordRepository,
  // Username,
} from '../../../domain';
import { OperationResponse } from 'src/shared/core/operation-response';
// import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { RESET_PASSWORD_REPOSITORY } from '../../../constants';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
// import { ResetPassword } from '../../domain/entity/reset-password.entity';

@Injectable()
export class ResetPasswordValidationService {
  constructor(
    @Inject(RESET_PASSWORD_REPOSITORY)
    private readonly resetPasswordRepository: ResetPasswordRepository,
  ) {}

  async ResetPasswordValidation(token: string) {
    const resetPasswordOrError =
      await this.resetPasswordRepository.findByToken(token);

    if (resetPasswordOrError.isFailure)
      return OperationResponse.fail(resetPasswordOrError.getError());

    const resetPassword = resetPasswordOrError.getValue();

    if (resetPassword.expiresAt < new Date() || resetPassword.isUsed)
      return OperationResponse.fail(ErrorListEnum.TokenIsInvalid);
    // Todo
    return OperationResponse.success(true);
  }
}
