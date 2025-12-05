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
    const userValidToken =
      await this.resetPasswordRepository.findTokenByUserId(userId);

    if (userValidToken.isSuccess) {
      const existingToken = userValidToken.getValue();
      console.log(existingToken);
      if (existingToken.expiresAt < new Date() || existingToken.isUsed) {
        return await this.generateToken(email, username, userId);
      } else {
        return OperationResponse.fail(ErrorListEnum.UserHasValidToken);
      }
    }
    return await this.generateToken(email, username, userId);
  }

  private async generateToken(
    email: Email,
    username: Username,
    userId: string,
  ): Promise<OperationResponse<ResetPassword, ErrorListEnum>> {
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
