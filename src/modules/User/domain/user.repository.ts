import { User } from './user.entity';

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findFirstUser(username: string, email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
