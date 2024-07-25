import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../../../core/config/services';

@Controller('profile/meta-role')
export class MetaRoleController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }


    @Get()
    get_meta() {

    }

    @Post()
    set_meta(){

    }

}
