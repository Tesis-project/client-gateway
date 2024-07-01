import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../../core/config/services';
import { Auth } from '../../core/decorators';

import { gw_UpdateUser_Dto } from './dto/UpdateUser.dto';

import {
    Pagination_Dto
} from '@tesis-project/dev-globals/dist/core/dto';


// CreateUserDto

@Controller('user')
export class UserController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }


    // @Post()
    // create_user(@Body() registerUserDto: CreateUser_Dto) {

    //     return {
    //         message: 'Test',
    //         ...registerUserDtoF
    //     };

    // }

    @Get()
    get_all_users(
        @Query() paginationDto: Pagination_Dto,
    ) {

        return this.client.send('user.find_all', {
            ...paginationDto
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }


    @Get(':id')
    get_user(
        @Param('id', ParseUUIDPipe) _id: string
    ) {

        return this.client.send('user.get_one', _id).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }


    @Auth()
    @Put('update/:id')
    update_user(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: gw_UpdateUser_Dto
    ) {

        return this.client.send('user.update', {
            _id: id,
            ...updateUserDto
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

}



