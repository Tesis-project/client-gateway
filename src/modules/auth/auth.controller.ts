import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { LoginUser_Dto, RegisterUser_Dto } from './dto';
import { Token, User } from './decorators';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../../core/config/services';
import { catchError } from 'rxjs';
import { Auth } from '../../core/decorators';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post()
    registerUser(@Body() registerUserDto: RegisterUser_Dto) {

        return this.client.send('auth.register.user', registerUserDto).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUser_Dto) {

        return this.client.send('auth.login.user', loginUserDto).pipe(
            catchError(err => { throw new RpcException(err) })
        )

    }

    @Auth()
    @Get('verify')
    verifyUser(@Token() token: string, @User() user: any) {

        return {
            user,
            token
        }

    }
}
