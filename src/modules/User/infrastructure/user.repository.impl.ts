import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserEntity, UserRepository } from '../domain';
import { User, UserDocument } from '../schemas/user.schema';
import { Username } from '../domain/value-object/username.vo';
import { Email } from 'src/modules/User/domain/value-object/email.vo';
import { UserMapper } from './mappers/user.mapper';
import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: UserEntity): Promise<Result<UserEntity, ErrorListEnum>> {
    const createdUser = new this.userModel(UserMapper.toPersistence(user));
    const savedUser = await createdUser.save();
    return UserMapper.toDomain(savedUser);
  }

  async findByUsername(
    username: Username,
  ): Promise<Result<UserEntity, ErrorListEnum>> {
    const userDoc = await this.userModel
      .findOne({ username: username.value })
      .exec();
    if (!userDoc) {
      return Result.fail(ErrorListEnum.UserNotFound);
    }
    return UserMapper.toDomain(userDoc);
  }

  async findById(id: string): Promise<Result<UserEntity, ErrorListEnum>> {
    const userDoc = await this.userModel.findById(id).exec();
    if (!userDoc) {
      return Result.fail(ErrorListEnum.UserNotFound);
    }
    return UserMapper.toDomain(userDoc);
  }

  async findFirstUser(
    username: Username,
    email: Email,
  ): Promise<Result<UserEntity, ErrorListEnum>> {
    const userDoc = await this.userModel.findOne({
      $or: [{ username: username.value }, { email: email.value }],
    });
    if (!userDoc) {
      return Result.fail(ErrorListEnum.UserNotFound);
    }

    return UserMapper.toDomain(userDoc);
  }
}
