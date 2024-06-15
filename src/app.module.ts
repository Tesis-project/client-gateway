import { Module } from '@nestjs/common';
import { NatsModule } from './core/transports/nats.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
