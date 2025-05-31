import { Email } from 'src/modules/User/domain/value-object/email.vo';
import { User } from './user.entity';
import { Username } from './value-object/username.vo';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { Result } from 'src/shared/core/result';

export interface UserRepository {
  findByUsername(username: Username): Promise<User | null>;
  findById(id: string): Promise<User | null>;

  findFirstUser(
    username: Username,
    email: Email,
  ): Promise<Result<User, ErrorListEnum>>;

  create(user: User): Promise<User>;
}
