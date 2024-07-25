import { Module } from '@nestjs/common';
import { NatsModule } from '../../core/transports/nats.module';
import { MetaRoleController } from './controllers/meta-role.controller';
import { ProfileController } from './controllers/profile.controller';

@Module({
    controllers: [ProfileController, MetaRoleController],
    providers: [],
    imports: [
        NatsModule
    ]
})
export class ProfileModule { }
