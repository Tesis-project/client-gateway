import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../../core/config/services';
import { Auth } from '../../core/decorators';
import { UpdateUserDto } from './dto';


import { CreateUserDto } from '@tesis-project/dev-globals/dist/modules/user/dto';


// CreateUserDto

@Controller('user')
export class UserController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }


    @Post()
    create_user(@Body() registerUserDto: CreateUserDto) {


        return registerUserDto;
        // return this.client.send('user.create', registerUserDto).pipe(
        //     catchError(err => {
        //         throw new RpcException(err)
        //     })
        // )
    }

    @Auth()
    @Put('update')
    update_user(@Body() updateUserDto: UpdateUserDto) {
        // return this.client.send('user.update', updateUserDto).pipe(
        //     catchError(err => {
        //         throw new RpcException(err)
        //     })
        // )
    }

}
