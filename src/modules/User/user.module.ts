import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { ResetPasswordSchema, ResetPassword } from './schemas';
import {
  UserRepositoryImpl,
  ResetPasswordRepositoryImpl,
} from './infrastructure/';
import {
  CompareUserEmailService,
  CreateResetPasswordService,
  CreateUserService,
  CreateUserUseCase,
  FindUserByUsernameService,
  ResetPasswordValidationService,
} from './application';
import { USER_REPOSITORY, RESET_PASSWORD_REPOSITORY } from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ResetPassword.name, schema: ResetPasswordSchema },
    ]),
  ],
  controllers: [],
  providers: [
    // services
    CreateUserService,
    FindUserByUsernameService,
    CompareUserEmailService,
    CreateResetPasswordService,
    ResetPasswordValidationService,
    // use-cases
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
    CreateResetPasswordService,
    ResetPasswordValidationService,
  ],
})
export class UserModule {}
