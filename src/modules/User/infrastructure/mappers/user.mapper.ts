import { Email } from 'src/modules/User/domain/value-object/email.vo';
import { Username } from '../../domain/value-object/username.vo';
import { UserDocument } from '../../schemas/user.schema';
import { Password } from 'src/modules/User/domain/value-object/password.vo';
import { User } from '../../domain';

export class UserMapper {
  static async toDomain(raw: UserDocument) {
    const username = Username.create(raw.username);
    if (username.isFailure) return username.getError();

    const email = Email.create(raw.email);
    if (email.isFailure) return email.getError();

    const password = await Password.create(raw.password, raw.username);
    if (password.isFailure) return email.getError();

    const user = User.create({
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

    return user;
  }

  static toPersistence(user: User) {
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
