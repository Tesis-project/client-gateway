import { Module } from '@nestjs/common';
import { Business_Vacants_Controller } from './controllers/vacants.controller';
import { Business_Vacants_Postulations_Controller } from './controllers/vacants-postulations.controller';
import { Business_Vacants_Contracts_Controller } from './controllers/vacants-contracts.controller';
import { NatsModule } from '../../core/transports/nats.module';


@Module({
    controllers: [
        Business_Vacants_Controller,
        Business_Vacants_Postulations_Controller,
        Business_Vacants_Contracts_Controller
    ],
    imports: [
        NatsModule
    ]
})
export class BusinessModule { }
