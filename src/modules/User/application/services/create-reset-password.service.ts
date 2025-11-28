import { Injectable } from '@nestjs/common';
import { Email, ResetPassword, Username } from '../../domain';
import { OperationResponse } from 'src/shared/core/operation-response';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

@Injectable()
export class CreateResetPasswordService {
  constructor() {}

  createResetPassword(
    email: Email,
    userName: Username,
    userId: string,
  ): Promise<OperationResponse<ResetPassword, ErrorListEnum>> {}
}
