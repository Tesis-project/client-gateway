
import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../../../core/config/services';
import { Auth } from '../../../core/decorators';

import { gw_UpdateUser_Dto } from '../dto/UpdateUser.dto';

import {
    Pagination_Dto
} from '@tesis-project/dev-globals/dist/core/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Client gateway - User')
@Controller('user')
export class UserController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

        @ApiOperation({ summary: 'Obtener todos los usuarios' })
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

    @ApiOperation({ summary: 'Obtener un usuario por id' })
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

    @ApiOperation({ summary: 'Obtener un perfil de usuario por id' })
    @Get('profile/:id')
    get_oneProfile(
        @Param('id', ParseUUIDPipe) _id: string
    ) {

        return this.client.send('user.get_oneProfile', _id).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

    @ApiOperation({ summary: 'Actualizar un usuario por id' })
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

