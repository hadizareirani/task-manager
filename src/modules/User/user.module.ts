import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { PasswordResetSchema, ResetPassword } from './schemas';
import {
  UserRepositoryImpl,
  ResetPasswordRepositoryImpl,
} from './infrastructure/';
import {
  CompareUserEmailService,
  CreateUserService,
  CreateUserUseCase,
  FindUserByUsernameService,
} from './application';
import { USER_REPOSITORY, RESET_PASSWORD_REPOSITORY } from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ResetPassword.name, schema: PasswordResetSchema },
    ]),
  ],
  controllers: [],
  providers: [
    CreateUserService,
    FindUserByUsernameService,
    CompareUserEmailService,
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: RESET_PASSWORD_REPOSITORY,
      useClass: ResetPasswordRepositoryImpl,
    },
  ],
  exports: [
    CreateUserService,
    FindUserByUsernameService,
    CompareUserEmailService,
  ],
})
export class UserModule {}
