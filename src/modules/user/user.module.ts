import { Module } from '@nestjs/common';
import { NatsModule } from '../../core/transports/nats.module';
import { Hiring_Data_Controller, UserController } from './controllers';

@Module({
  controllers: [
    UserController,
    Hiring_Data_Controller
],
  providers: [],
  imports: [
        NatsModule
  ]
})
export class UserModule {}
