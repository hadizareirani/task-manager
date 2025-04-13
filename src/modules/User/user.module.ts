/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConnectionService],
})
export class UserModule {}
