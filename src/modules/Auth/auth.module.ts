import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import {
  SignUpUseCase,
  LoginUseCase,
  ForgotPasswordUseCase,
  ForgotPasswordValidationUseCase,
} from './application';
import { AuthController } from './interfaces';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    SignUpUseCase,
    LoginUseCase,
    ForgotPasswordUseCase,
    ForgotPasswordValidationUseCase,
  ],
})
export class AuthModule {}
