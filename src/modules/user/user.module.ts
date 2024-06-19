import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NatsModule } from '../../core/transports/nats.module';

@Module({
  controllers: [UserController],
  providers: [],
  imports: [
        NatsModule
  ]
})
export class UserModule {}
