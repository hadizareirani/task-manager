import { ConnectionService } from 'src/connection/connection.service';
import { User, UserRepository } from '../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private connectionService: ConnectionService) {}
  async create(user: User): Promise<User> {
    return await this.connectionService.user.create({
      data: user,
    });
  }
}
