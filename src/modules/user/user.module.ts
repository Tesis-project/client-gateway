import { Module } from '@nestjs/common';
import { NatsModule } from '../../core/transports/nats.module';
import { Bank_Data_Controller, Hiring_Data_Controller, Personal_Data_Controller, UserController } from './controllers';

@Module({
    controllers: [
        UserController,
        Hiring_Data_Controller,
        Personal_Data_Controller,
        Bank_Data_Controller
    ],
    providers: [],
    imports: [
        NatsModule
    ]
})
export class UserModule { }
