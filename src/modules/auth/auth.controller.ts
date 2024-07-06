import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { Token, User_Auth } from './decorators';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../../core/config/services';
import { catchError } from 'rxjs';
import { Auth } from '../../core/decorators';

import { LoginAuth_Dto, RegisterAuth_Dto } from '@tesis-project/dev-globals/dist/modules/auth/dto';
import { User_I } from '@tesis-project/dev-globals/dist/modules/user/interfaces';


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
    verifyUser(@Token() token: string, @User_Auth() user: User_I) {

        return {
            user,
            token
        }

    }
}
