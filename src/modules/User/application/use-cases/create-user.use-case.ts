import { Injectable } from '@nestjs/common';
import { CreateUserService } from '../services';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(
    username: string,
    email: string,
    name: string,
    password: string,
  ) {
    return this.createUserService.createUser(username, email, name, password);
  }
}
