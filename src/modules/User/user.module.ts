import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import {
  CompareUserEmailService,
  CreateUserService,
  CreateUserUseCase,
  FindUserByUsernameService,
} from './application';
import { USER_REPOSITORY } from './constants/user-repository.token';
import { MongooseModule } from '@nestjs/mongoose';
import { RESET_PASSWORD_REPOSITORY } from './constants/reset-password-repository.token';
import { ResetPasswordRepositoryImpl } from './infrastructure/reset-password.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
