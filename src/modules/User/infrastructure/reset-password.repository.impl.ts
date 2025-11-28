import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ResetPasswordRepository } from '../domain/repository/reset-password.repository';
import { ResetPassword as ResetPasswordEntity } from '../domain/entity/reset-password.entity';
import {
  PasswordReset,
  PasswordResetDocument,
} from '../schemas/password-reset.schema';
import { ResetPasswordMapper } from './mappers/reset-password.mapper';
import { Result } from 'src/shared/core/result';
import { ErrorListEnum } from 'src/shared/enums/error-list.enum';

@Injectable()
export class ResetPasswordRepositoryImpl implements ResetPasswordRepository {
  constructor(
    @InjectModel(PasswordReset.name)
    private readonly passwordResetModel: Model<PasswordResetDocument>,
  ) {}

  async create(resetPassword: ResetPasswordEntity) {
    const createResetPassword = new this.passwordResetModel(
      ResetPasswordMapper.toPersistence(resetPassword),
    );
    const response = await createResetPassword.save();
    return ResetPasswordMapper.toDomain(response);
  }

  async findByToken(
    token: string,
  ): Promise<Result<ResetPasswordEntity, ErrorListEnum>> {
    const tokenDoc = await this.passwordResetModel.findOne({ token }).exec();
    if (!tokenDoc) {
      return Result.fail(ErrorListEnum.TokenIsInvalid);
    }
    return ResetPasswordMapper.toDomain(tokenDoc);
  }
}
