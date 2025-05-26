import { Email } from 'src/modules/User/domain/value-object/email.vo';
import { Username } from '../../domain/value-object/username.vo';
import { User, UserDocument } from '../../schemas/user.schema';
import { Password } from 'src/modules/User/domain/value-object/password.vo';
import { User as userEntity } from '../../domain';
import { Result } from 'src/shared/core/result';

type UserToDomainMapperParams = User & Pick<UserDocument, '_id'>;

export class UserMapper {
  static async toDomain(raw: UserToDomainMapperParams) {
    const username = Username.create(raw.username);
    if (username.isFailure) return Result.fail(username.getError());

    const email = Email.create(raw.email);
    if (email.isFailure) return Result.fail(email.getError());

    const password = await Password.create(raw.password, raw.username);
    if (password.isFailure) return Result.fail(password.getError());

    const user = userEntity.create({
      id: raw._id.toString(),
      username: username.getValue(),
      email: email.getValue(),
      password: password.getValue(),
      name: raw.name,
      isDeleted: raw.isDeleted,
      deletedAt: raw.deletedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    return Result.ok(user).getValue();
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
