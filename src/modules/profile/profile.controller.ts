import { Controller, Get, Body, Patch, Param, Inject, ParseUUIDPipe, Put } from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../../core/config/services';
import { catchError } from 'rxjs';
import { gw_UpdateProfileDto } from './dto/update-profile.dto';
import { Auth } from '../../core/decorators';

@Auth()
@Controller('profile')
export class ProfileController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    // @Post()
    // create(@Body() createProfileDto: Create_Profile_Dto) {

    //    return this.client.send('profile.create', {
    //         ...createProfileDto
    //     }).pipe(
    //         catchError(err => {
    //             throw new RpcException(err)
    //         })
    //     )

    // }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {

        return this.client.send('profile.findOne', id).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProfileDto: gw_UpdateProfileDto) {
    // update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProfileDto: any) {

        return this.client.send('profile.update', {
            _id: id,
            ...updateProfileDto
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}



