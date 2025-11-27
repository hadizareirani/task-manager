import { User, UserDocument } from '../../schemas/user.schema';
import {
  Email,
  Name,
  Password,
  User as userEntity,
  Username,
} from '../../domain';
import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

type UserToDomainMapperParams = User & Pick<UserDocument, '_id'>;

export class UserMapper {
  static toDomain(
    raw: UserToDomainMapperParams,
  ): Result<userEntity, ErrorListEnum> {
    const username = Username.fromPersistence(raw.username);
    const email = Email.fromPersistence(raw.email);
    const name = Name.fromPersistence(raw.name);
    const password = Password.fromPersistence(raw.password);

    return Result.ok(
      userEntity.create({
        id: raw._id.toString(),
        username,
        email,
        password,
        name,
        isDeleted: raw.isDeleted,
        deletedAt: raw.deletedAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      }),
    );
  }

  static toDomainWithValidation(
    raw: UserToDomainMapperParams,
  ): Result<userEntity, ErrorListEnum> {
    const usernameResult = Username.create(raw.username);
    if (usernameResult.isFailure) return Result.fail(usernameResult.getError());

    const emailResult = Email.create(raw.email);
    if (emailResult.isFailure) return Result.fail(emailResult.getError());

    const nameResult = Name.create(raw.name);
    if (nameResult.isFailure) return Result.fail(nameResult.getError());

    const passwordResult = Password.fromHashed(raw.password);
    if (passwordResult.isFailure) return Result.fail(passwordResult.getError());

    const user = userEntity.create({
      id: raw._id.toString(),
      username: usernameResult.getValue(),
      email: emailResult.getValue(),
      password: passwordResult.getValue(),
      name: nameResult.getValue(),
      isDeleted: raw.isDeleted,
      deletedAt: raw.deletedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    return Result.ok(user);
  }

  static toPersistence(user: userEntity) {
    return {
      ...(user.id && { _id: user.id }),
      username: user.username.value,
      email: user.email.value,
      name: user.name.value,
      password: user.password.value,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
