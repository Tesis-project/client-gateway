
import { Module } from '@nestjs/common';
import { EmailingController, NotificationsController } from './controllers';
import { NatsModule } from '../../core/transports/nats.module';

@Module({
    controllers: [
        // NotificationsController,
        // EmailingController
    ],
    providers: [],
    imports: [
        NatsModule
    ]
})
export class NotificationsModule { }
