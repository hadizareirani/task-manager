import { Module } from '@nestjs/common';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/User/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
