import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/User/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
