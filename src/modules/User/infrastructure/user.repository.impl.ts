import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserEntity, UserRepository } from '../domain';
import { User, UserDocument } from '../schemas/user.schema';

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
    username: string,
    email: string,
  ): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });
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
}
