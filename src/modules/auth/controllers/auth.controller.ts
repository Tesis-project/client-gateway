import { Controller, Get, Post, Body, Inject, ParseUUIDPipe, Param } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { LoginAuth_Dto, RegisterAuth_Dto } from '@tesis-project/dev-globals/dist/modules/auth/dto';
import { Session_Auth_I } from '@tesis-project/dev-globals/dist/modules/auth/interfaces';
import { _Response_I } from '@tesis-project/dev-globals/dist/core/interfaces';
import { NATS_SERVICE } from '../../../core/config/services';
import { Auth } from '../../../core/decorators';
import { User_Auth } from '../decorators';


@Controller('auth')
export class AuthController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post()
    registerUser(@Body() registerUserDto: RegisterAuth_Dto) {
        return this.client.send('auth.register.user', registerUserDto).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginAuth_Dto) {

        return this.client.send('auth.login.user', loginUserDto).pipe(
            catchError(err => { throw new RpcException(err) })
        )

    }

    @Auth()
    @Get('verify')
    verifyUser( @User_Auth() auth: Session_Auth_I ) {

        const resp: _Response_I<Session_Auth_I> = {
            ok: true,
            statusCode: 200,
            message: 'Token verify',
            data: auth
        };

        return resp;

    }
}
