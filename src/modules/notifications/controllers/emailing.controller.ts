import { Body, Controller, Inject, Post } from "@nestjs/common";
import { NATS_SERVICE } from "../../../core/config/services";
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from "rxjs";

import {Send_Email_Dto} from '@tesis-project/dev-globals/dist/modules/notifications/dto/send-email.dto'

@Controller('notify/emailing')
export class EmailingController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post('send')
    send_email( @Body() send_email: Send_Email_Dto) {

        return this.client.send('notifications.emailing.send', send_email).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        );

    }

}