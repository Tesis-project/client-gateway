import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "../../../core/config/services";
import { catchError } from "rxjs";

import { Create_Password_Request_Dto, Accept_Password_Request_Dto, Create_Request_Key_Dto } from '@tesis-project/dev-globals/dist/modules/auth/dto'
import { User_Auth } from "../decorators";
import { User_I } from "@tesis-project/dev-globals/dist/modules/user/interfaces";
import { Auth } from "../../../core/decorators";


@Controller('auth/requests')
export class RequestsController {


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post('pass_request')
    create_password_request(@Body() create_request_dto: Create_Password_Request_Dto) {

        return this.client.send('auth.requests.pass_request', create_request_dto).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Auth()
    @Post('create')
    create_request(@Body() create_request_dto: Create_Request_Key_Dto, @User_Auth() user_auth: User_I) {

        return this.client.send('auth.requests.create', {
            data: create_request_dto,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }


    // @Auth()
    @Get(':key')
    get_request(@Param('key') key: string) {

        return this.client.send('auth.requests.get', {
            key
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    // @Auth()
    @Put('verify/:key')
    verify_request(@Param('key') key: string) {

        return this.client.send('auth.requests.verify', {
            key
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Put('verify_pass/:key')
    verify_pass_request(
        @Param('key') key: string,
        @Body() Accept_Password_Request_Dto: Accept_Password_Request_Dto
    ) {

        return this.client.send('auth.requests.verify_pass', {
            key,
            data: Accept_Password_Request_Dto
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}