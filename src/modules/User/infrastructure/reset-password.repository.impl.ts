import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ResetPasswordRepository } from '../domain/repository/reset-password.repository';
import { ResetPassword as ResetPasswordEntity } from '../domain/entity/reset-password.entity';
import {
  PasswordReset,
  PasswordResetDocument,
} from '../schemas/password-reset.schema';

@Injectable()
export class ResetPasswordRepositoryImpl implements ResetPasswordRepository {
  constructor(
    @InjectModel(PasswordReset.name)
    private readonly passwordResetModel: Model<PasswordResetDocument>,
  ) {}

  create(resetPassword: ResetPasswordEntity) {
    return resetPassword as any;
  }

  findByToken(token: string) {
    return token as any;
  }
}
