import { Email } from 'src/modules/User/domain/value-object/email.vo';
import { Username } from '../../domain/value-object/username.vo';
import { User, UserDocument } from '../../schemas/user.schema';
import { Password } from 'src/modules/User/domain/value-object/password.vo';
import { User as userEntity } from '../../domain';
import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

type UserToDomainMapperParams = User & Pick<UserDocument, '_id'>;

export class UserMapper {
  static async toDomain(
    raw: UserToDomainMapperParams,
  ): Promise<Result<userEntity, ErrorListEnum>> {
    const usernameResult = Username.create(raw.username);
    const emailResult = Email.create(raw.email);
    const passwordResult = await Password.create(raw.password, raw.username);

    if (usernameResult.isFailure) return Result.fail(usernameResult.error);
    if (emailResult.isFailure) return Result.fail(emailResult.error);
    if (passwordResult.isFailure) return Result.fail(passwordResult.error);

    const user = userEntity.create({
      id: raw._id.toString(),
      username: usernameResult.getValue(),
      email: emailResult.getValue(),
      password: passwordResult.getValue(),
      name: raw.name,
      isDeleted: raw.isDeleted,
      deletedAt: raw.deletedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    return Result.ok(user);
  }

  static toPersistence(user: userEntity) {
    return {
      _id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      password: user.password,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
