import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config/services';
import { envs } from '../config/envs';

const nats_module = [
    ClientsModule.register([
        {
            name: NATS_SERVICE,
            transport: Transport.NATS,
            options: {
                servers: envs.natsServers
            },
        },
    ]),
]

@Module({
    imports: [
        ...nats_module
    ],
    exports: [
        ...nats_module
    ]
})
export class NatsModule {  }
