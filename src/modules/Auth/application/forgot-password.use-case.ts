import { Injectable } from '@nestjs/common';
import { FindUserByUsernameService } from 'src/modules/User';

@Injectable()
export class ForgotPasswordUseCase {
    constructor(
      private readonly findUserByUsernameService: FindUserByUsernameService
    ) {}

  async execute(username: string, email: string) {
    const hasUser = await this.findUserByUsernameService.findUserByUsername(username);
    if (!hasUser.isSucceeded()) return hasUser.getError();
    
    
    return { username, email };
  }
}
