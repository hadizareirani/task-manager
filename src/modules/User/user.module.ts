/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { CreateUserUseCase } from './application';
import { USER_REPOSITORY } from './constants/user-repository.token';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ConnectionService,
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
