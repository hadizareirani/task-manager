import {
  PasswordReset,
  PasswordResetDocument,
} from '../../schemas/password-reset.schema';

type ResetPasswordToDomainMapperParams = PasswordReset &
  Pick<PasswordResetDocument, '_id'>;

export class ResetPasswordMapper {
  static toDomain(raw: ResetPasswordToDomainMapperParams) {
    return raw as any;
  }
}
