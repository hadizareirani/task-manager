import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '../../domain';
import { OperationResponse } from 'src/shared/core/operation-response';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findByUsername(id);
    if (!user) return OperationResponse.fail(ErrorListEnum.UserNotFound);
    return OperationResponse.success<User>(user);
  }
}
