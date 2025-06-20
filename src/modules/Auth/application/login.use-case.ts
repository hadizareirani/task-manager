import { Injectable } from '@nestjs/common';
import { FindUserByUsernameService } from 'src/modules/User';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserByUsernameService: FindUserByUsernameService,
  ) {}
  execute(username: string, password: string) {
    console.log(username, password);
  }
}
