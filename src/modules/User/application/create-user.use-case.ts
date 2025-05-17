import { Inject, Injectable } from '@nestjs/common';
import { User, UserRepository } from '../domain';
import { OperationResponse } from 'src/shared/responses/operation-response';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { Email } from 'src/shared/domain/value-objects/email.vo';
import { Password } from 'src/shared/domain/value-objects/password.vo';
import { USER_REPOSITORY } from '../constants/user-repository.token';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(
    username: string,
    email: string,
    name: string,
    password: string,
  ) {
    // let user = await this.userRepository.findFirstUser(username, email);
    // if (user) {
    //   return OperationResponse.fail(ErrorListEnum.UserAlreadyExists);
    // }

    // if (!Email.isValid(email)) {
    //   return OperationResponse.fail(ErrorListEnum.EmailIsNotValid);
    // }
    // const hashedPassword = await Password.create(password, username);
    // user = new User(
    //   '',
    //   username,
    //   Email.create(email),
    //   name,
    //   hashedPassword,
    //   false,
    //   null,
    // );

    // const userId = (await this.userRepository.create(user)).id;
    // return OperationResponse.success<string>(userId);
    return { username, email, name, password };
  }
}
