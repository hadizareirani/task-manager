import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ResetPasswordRepository,
  ResetPassword as ResetPasswordEntity,
} from '../../domain';

import { ResetPassword, ResetPasswordDocument } from '../../schemas';
import { ResetPasswordMapper } from '../mappers';
import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

@Injectable()
export class ResetPasswordRepositoryImpl implements ResetPasswordRepository {
  constructor(
    @InjectModel(ResetPassword.name)
    private readonly resetPasswordModel: Model<ResetPasswordDocument>,
  ) {}

  async create(resetPassword: ResetPasswordEntity) {
    const createResetPassword = new this.resetPasswordModel(
      ResetPasswordMapper.toPersistence(resetPassword),
    );
    const response = await createResetPassword.save();
    return ResetPasswordMapper.toDomain(response);
  }

  async findByToken(
    token: string,
  ): Promise<Result<ResetPasswordEntity, ErrorListEnum>> {
    const tokenDoc = await this.resetPasswordModel.findOne({ token }).exec();
    if (!tokenDoc) {
      return Result.fail(ErrorListEnum.TokenIsInvalid);
    }
    return ResetPasswordMapper.toDomain(tokenDoc);
  }

  async findTokenByUserId(
    userId: string,
  ): Promise<Result<ResetPasswordEntity, ErrorListEnum>> {
    const tokenDoc = await this.resetPasswordModel.findOne({ userId }).exec();
    if (!tokenDoc) {
      return Result.fail(ErrorListEnum.ItemNotFound);
    }
    return ResetPasswordMapper.toDomain(tokenDoc);
  }
}
