import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain';
import { USER_REPOSITORY } from '../constants/user-repository.token';
import { UserMapper } from '../infrastructure/mappers/user.mapper';
import { OperationResponse } from 'src/shared/core/operation-response';

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
    // const validUsername = Username.create(username);
    // if (!validUsername)
    //   return OperationResponse.fail(ErrorListEnum.UsernameIsWrong);

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

    const user = await UserMapper.toDomain({
      _id: '',
      username,
      password,
      email,
      name,
      isDeleted: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (user.isFailure) return OperationResponse.fail(user.getError());
    // const userValue = user.getValue();
    // let user = await this.userRepository.findFirstUser(
    //   userValue.username,
    //   userValue.email,
    // );
    // if (user) {
    //   return OperationResponse.fail(ErrorListEnum.UserAlreadyExists);
    // }

    // const userId = (await this.userRepository.create(user)).id;
    // return OperationResponse.success<string>(userId);
    return { username, email, name, password };
  }
}
