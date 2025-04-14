import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain';
import { OperationResponse } from 'src/shared/responses/operation-response';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { Email } from 'src/shared/domain/value-objects/email.vo';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    username: string,
    email: string,
    // name: string,
    // password: string,
  ) {
    const user = await this.userRepository.findFirstUser(username, email);
    if (user) {
      return OperationResponse.fail(ErrorListEnum.UserAlreadyExists);
    }

    if (!Email.isValid(email)) {
      return OperationResponse.fail(ErrorListEnum.EmailIsNotValid);
    }
  }
}
