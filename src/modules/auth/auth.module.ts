

import { Module } from '@nestjs/common';
import { NatsModule } from '../../core/transports/nats.module';
import { AuthController, RequestsController } from './controllers';

@Module({
    controllers: [AuthController, RequestsController],
    providers: [],
    imports: [
        NatsModule
    ]
})
export class AuthModule { }
