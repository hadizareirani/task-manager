import { Result } from 'src/shared/core/result';
import { ResetPassword } from '../entity';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

export interface ResetPasswordRepository {
  create(
    resetPassword: ResetPassword,
  ): Promise<Result<ResetPassword, ErrorListEnum>>;

  findByToken(token: string): Promise<Result<ResetPassword, ErrorListEnum>>;
}
