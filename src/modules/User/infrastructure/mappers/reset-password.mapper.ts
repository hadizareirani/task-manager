import { Result } from 'src/shared/core/result';
import { ResetPassword, ResetPasswordDocument } from '../../schemas';
import {
  ResetPassword as ResetPasswordEntity,
  Email,
  Username,
} from '../../domain';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

type ResetPasswordToDomainMapperParams = ResetPassword &
  Pick<ResetPasswordDocument, '_id'>;

export class ResetPasswordMapper {
  static toDomain(
    raw: ResetPasswordToDomainMapperParams,
  ): Result<ResetPasswordEntity, ErrorListEnum> {
    const username = Username.fromPersistence(raw.username);
    const email = Email.fromPersistence(raw.email);

    return Result.ok(
      ResetPasswordEntity.create({
        id: raw._id.toString(),
        userId: raw.userId.toString(),
        resetToken: raw.resetToken,
        username,
        email,
        expiresAt: raw.expiresAt,
        isUsed: raw.isUsed,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      }),
    );
  }

  static toPersistence(resetPassword: ResetPasswordEntity) {
    return {
      ...(resetPassword.id && { _id: resetPassword.id }),
      userId: resetPassword.userId.toString(),
      resetToken: resetPassword.resetToken,
      username: resetPassword.username.value,
      email: resetPassword.email.value,
      expiresAt: resetPassword.expiresAt,
      isUsed: resetPassword.isUsed,
      createdAt: resetPassword.createdAt,
      updatedAt: resetPassword.updatedAt,
    };
  }
}
