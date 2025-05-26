import { Email } from 'src/modules/User/domain/value-object/email.vo';
import { User } from './user.entity';
import { Username } from './value-object/username.vo';

export interface UserRepository {
  findByUsername(username: Username): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findFirstUser(username: Username, email: Email): Promise<User | null>;
  create(user: User): Promise<User>;
}
