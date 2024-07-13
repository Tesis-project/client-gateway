
import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { NatsModule } from '../../core/transports/nats.module';

@Module({
    controllers: [MediaController],
    imports: [
        NatsModule
    ]
})
export class MediaModule { }
