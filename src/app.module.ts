import { Module } from '@nestjs/common';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/User/user.module';
import { ResponseModelInterceptor } from './shared/interceptors/response-model/response-model.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseModelInterceptor,
    },
  ],
})
export class AppModule {}
