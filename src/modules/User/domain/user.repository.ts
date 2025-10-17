
import { User } from './user.entity';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { Result } from 'src/shared/core/result';
import { Email, Username } from './value-object';

export interface UserRepository {
  findByUsername(username: Username): Promise<Result<User, ErrorListEnum>>;
  findById(id: string): Promise<Result<User, ErrorListEnum>>;

  findFirstUser(
    username: Username,
    email: Email,
  ): Promise<Result<User, ErrorListEnum>>;

  create(user: User): Promise<Result<User, ErrorListEnum>>;
}
