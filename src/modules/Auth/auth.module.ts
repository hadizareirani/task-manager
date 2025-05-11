import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignUpUseCase } from './application/sign-up.use-case';
import { AuthController } from './interface/controller/auth.controller';
import { UserModule } from '../User/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  providers: [SignUpUseCase],
})
export class AuthModule {}
