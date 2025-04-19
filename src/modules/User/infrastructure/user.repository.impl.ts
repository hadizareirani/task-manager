import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { User, UserRepository } from '../domain';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private connectionService: ConnectionService) {}
  async create(user: User): Promise<User> {
    return await this.connectionService.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        username: user.username,
        deletedAt: user.deletedAt,
        isDeleted: user.isDeleted,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.connectionService.user.findUnique({
      where: {
        username,
      },
    });
  }
  async findById(id: string): Promise<User | null> {
    return await this.connectionService.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findFirstUser(username: string, email: string): Promise<User | null> {
    return await this.connectionService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }
}
