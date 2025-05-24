import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserEntity, UserRepository } from '../domain';
import { User, UserDocument } from '../schemas/user.schema';
import { Username } from '../domain/value-object/username.vo';
import { Email } from 'src/shared/domain/value-objects/email.vo';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();

    return new UserEntity(
      savedUser._id.toString(),
      savedUser.username,
      savedUser.email,
      savedUser.name,
      savedUser.password,
      savedUser.isDeleted,
      savedUser.deletedAt,
      savedUser.createdAt,
      savedUser.updatedAt,
    );
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findOne({ username }).exec();
    if (!userDoc) return null;
    return new UserEntity(
      userDoc._id.toString(),
      userDoc.username,
      userDoc.email,
      userDoc.name,
      userDoc.password,
      userDoc.isDeleted,
      userDoc.deletedAt,
      userDoc.createdAt,
      userDoc.updatedAt,
    );
  }
  async findById(id: string): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findById(id).exec();
    if (!userDoc) return null;
    return new UserEntity(
      userDoc._id.toString(),
      userDoc.username,
      userDoc.email,
      userDoc.name,
      userDoc.password,
      userDoc.isDeleted,
      userDoc.deletedAt,
      userDoc.createdAt,
      userDoc.updatedAt,
    );
  }
  async findFirstUser(
    username: Username,
    email: Email,
  ): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findOne({
      $or: [{ username: username.value }, { email: email.value }],
    });
    if (!userDoc) return null;
    return UserEntity.create({
      id: userDoc._id.toString(),
      username: Username.create(userDoc.username),
      email: userDoc.email,
      name: userDoc.name,
      password: userDoc.password,
      isDeleted: userDoc.isDeleted,
      deletedAt: userDoc.deletedAt,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    });
  }
}
