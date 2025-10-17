import { Injectable } from '@nestjs/common';
import { CompareUserEmailService, FindUserByUsernameService } from 'src/modules/User';


@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly findUserByUsernameService: FindUserByUsernameService,
    private readonly compareUserEmailService: CompareUserEmailService,
  ) { }

  async execute(username: string, email: string) {
    const hasUser = await this.findUserByUsernameService.findUserByUsername(username);
    if (!hasUser.isSucceeded()) return hasUser.getError();

    // const hasValidEmail = this.compareUserEmailService.compare(email, hasUser.getValue().email)
    // TODO: implement email comparison logic

    return { username, email };
  }
}
