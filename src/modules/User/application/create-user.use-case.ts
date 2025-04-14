import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '../domain';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    username: string,
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const user = new User('', username, email, name, password);
    return this.userRepository.create(user);
  }
}
