import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { NatsModule } from '../../core/transports/nats.module';

@Module({
    controllers: [ProfileController],
    providers: [],
    imports: [
        NatsModule
    ]
})
export class ProfileModule { }
