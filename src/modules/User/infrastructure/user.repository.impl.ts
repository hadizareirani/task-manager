import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserEntity, UserRepository } from '../domain';
import { User, UserDocument } from '../schemas/user.schema';
import { Username } from '../domain/value-object/username.vo';
import { Email } from 'src/shared/domain/value-objects/email.vo';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel(UserMapper.toPersistence(user));
    const savedUser = await createdUser.save();
    return UserMapper.toDomain(savedUser);
  }

  async findByUsername(username: Username): Promise<UserEntity | null> {
    const userDoc = await this.userModel
      .findOne({ username: username.value })
      .exec();
    if (!userDoc) return null;
    return UserMapper.toDomain(userDoc);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findById(id).exec();
    if (!userDoc) return null;
    return UserMapper.toDomain(userDoc);
  }

  async findFirstUser(
    username: Username,
    email: Email,
  ): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findOne({
      $or: [{ username: username.value }, { email: email.value }],
    });
    if (!userDoc) return null;
    return UserMapper.toDomain(userDoc);
  }
}
