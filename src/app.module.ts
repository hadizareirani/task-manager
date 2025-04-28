import { Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/User/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ResponseModelInterceptor } from './shared/interceptors/response-model/response-model.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config available everywhere
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
