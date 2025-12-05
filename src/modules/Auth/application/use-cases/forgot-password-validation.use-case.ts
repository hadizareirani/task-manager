import { Injectable } from '@nestjs/common';
import {
  CompareUserEmailService,
  CreateResetPasswordService,
  FindUserByUsernameService,
} from 'src/modules/User';
import { OperationResponse } from 'src/shared/core/operation-response';

@Injectable()
export class ForgotPasswordValidationUseCase {
  constructor(
    private readonly findUserByUsernameService: FindUserByUsernameService,
    private readonly compareUserEmailService: CompareUserEmailService,
    private readonly createResetPasswordService: CreateResetPasswordService,
  ) {}

  execute(token: string) {
    return OperationResponse.success(true);
  }
}
