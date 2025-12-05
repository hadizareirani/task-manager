import { Inject, Injectable } from '@nestjs/common';
import {
  Email,
  Name,
  Password,
  User,
  Username,
  UserRepository,
} from '../../../domain';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { OperationResponse } from 'src/shared/core/operation-response';
import { USER_REPOSITORY } from '../../../constants';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async createUser(
    username: string,
    email: string,
    name: string,
    password: string,
  ): Promise<OperationResponse<User, ErrorListEnum>> {
    const usernameOrError = Username.create(username);
    if (usernameOrError.isFailure)
      return OperationResponse.fail(usernameOrError.getError());

    const emailOrError = Email.create(email);
    if (emailOrError.isFailure)
      return OperationResponse.fail(emailOrError.getError());

    const passwordOrError = await Password.create(password, username);
    if (passwordOrError.isFailure)
      return OperationResponse.fail(passwordOrError.getError());

    const nameOrError = Name.create(name);
    if (nameOrError.isFailure)
      return OperationResponse.fail(nameOrError.getError());

    const hasUser = await this.userRepository.findFirstUser(
      usernameOrError.getValue(),
      emailOrError.getValue(),
    );

    if (hasUser.isSuccess) {
      return OperationResponse.fail(ErrorListEnum.UserAlreadyExists);
    }
    const userEntity = User.create({
      id: '',
      username: usernameOrError.getValue(),
      password: passwordOrError.getValue(),
      email: emailOrError.getValue(),
      name: nameOrError.getValue(),
      isDeleted: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await this.userRepository.create(userEntity);
    if (user.isFailure) return OperationResponse.fail(user.getError());
    return OperationResponse.success(user.getValue());
  }
}
