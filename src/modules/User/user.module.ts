/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ConnectionService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
