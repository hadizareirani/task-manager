import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain';
// import { OperationResponse } from 'src/shared/core/operation-response';
// import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

@Injectable()
export class FindUserByUsernameUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  // async execute(username: string) {
  //   const user = await this.userRepository.findByUsername(username);
  //   if (!user) return OperationResponse.fail(ErrorListEnum.UserNotFound);
  //   return OperationResponse.success<User>(user);
  // }
}
