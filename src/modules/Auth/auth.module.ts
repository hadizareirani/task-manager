import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignUpUseCase } from './application/sign-up.use-case';
import { AuthController } from './interface/controller/auth.controller';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [SignUpUseCase],
})
export class AuthModule {}
