import { AuthController } from './interface/controller/auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
