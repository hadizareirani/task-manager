import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../constants';
import { User, Username, UserRepository } from '../../../domain';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';
import { OperationResponse } from 'src/shared/core/operation-response';

@Injectable()
export class FindUserByUsernameService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async findUserByUsername(
    username: string,
  ): Promise<OperationResponse<User, ErrorListEnum>> {
    const usernameOrError = Username.create(username);
    if (usernameOrError.isFailure)
      return OperationResponse.fail(usernameOrError.getError());

    const hasUser = await this.userRepository.findByUsername(
      usernameOrError.getValue(),
    );

    if (hasUser.isFailure) {
      return OperationResponse.fail(ErrorListEnum.UserNotFound);
    }

    return OperationResponse.success(hasUser.getValue());
  }
}
