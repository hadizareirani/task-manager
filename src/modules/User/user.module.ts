import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { CreateUserService, CreateUserUseCase } from './application';
import { USER_REPOSITORY } from './constants/user-repository.token';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [
    CreateUserService,
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUserService],
})
export class UserModule {}
