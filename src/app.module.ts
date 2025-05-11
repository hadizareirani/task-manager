import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/User/user.module';
// import { ResponseModelInterceptor } from './shared/interceptors/response-model/response-model.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: ResponseModelInterceptor,
  //   },
  // ],
})
export class AppModule {}
