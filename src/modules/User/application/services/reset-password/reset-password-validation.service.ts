import { Inject, Injectable } from '@nestjs/common';
// import { randomBytes } from 'crypto';
import {
  // Email,
  // ResetPassword,
  ResetPasswordRepository,
  // Username,
} from '../../../domain';
// import { OperationResponse } from 'src/shared/core/operation-response';
// import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { RESET_PASSWORD_REPOSITORY } from '../../../constants';
// import { ResetPassword } from '../../domain/entity/reset-password.entity';

@Injectable()
export class ResetPasswordValidationService {
  constructor(
    @Inject(RESET_PASSWORD_REPOSITORY)
    private readonly resetPasswordRepository: ResetPasswordRepository,
  ) {}
  ResetPasswordValidation(token: string) {}
}
