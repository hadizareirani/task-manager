import { Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import {
  Email,
  ResetPassword,
  ResetPasswordRepository,
  Username,
} from '../../domain';
import { OperationResponse } from 'src/shared/core/operation-response';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { RESET_PASSWORD_REPOSITORY } from '../../constants';

@Injectable()
export class CreateResetPasswordService {
  constructor(
    @Inject(RESET_PASSWORD_REPOSITORY)
    private readonly resetPasswordRepository: ResetPasswordRepository,
  ) {}

  async createResetPassword(
    email: Email,
    username: Username,
    userId: string,
  ): Promise<OperationResponse<ResetPassword, ErrorListEnum>> {
    // Todo:I must check if there is an existing valid reset token for the user before creating a new one.
    // Find valid reset password token logic can be added here.

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const resetPasswordEntity = ResetPassword.create({
      id: '',
      userId,
      resetToken: token,
      email,
      username,
      expiresAt,
      isUsed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const resetToken =
      await this.resetPasswordRepository.create(resetPasswordEntity);

    if (resetToken.isFailure)
      return OperationResponse.fail(resetToken.getError());

    return OperationResponse.success(resetToken.getValue());
  }
}
