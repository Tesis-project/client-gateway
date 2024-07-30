import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../../../core/config/services';

import { Update_Meta_Artist_Dto, Update_Meta_Contratist_Dto } from '@tesis-project/dev-globals/dist/modules/profile/dto/';
import { Auth } from '../../../core/decorators';
import { User_Auth } from '../../auth/decorators';
import { User_I } from '@tesis-project/dev-globals/dist/modules/user/interfaces';
import { catchError } from 'rxjs';
import { Model_Dto } from '../dto/model.dto';

@Controller('profile/meta-role')
export class MetaRoleController {

    constructor(
        @Inject(NATS_SERVICE)
        private readonly client: ClientProxy
    ) { }

    @Auth()
    @Get('get_meta')
    get_meta(@User_Auth() user_auth: User_I) {

        return this.client.send('profile.meta.get', {
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Auth()
    @Post('meta_a')
    set_metaArtist(@Body() Update_Meta_Artist_Dto: Update_Meta_Artist_Dto, @User_Auth() user_auth: User_I) {

        return this.client.send('profile.meta.artists.set', {
            meta: Update_Meta_Artist_Dto,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Auth()
    @Post('meta_c')
    set_metaContratist(@Body() Update_Meta_Contratist_Dto: Update_Meta_Contratist_Dto, @User_Auth() user_auth: User_I) {

        return this.client.send('profile.meta.contratist.set', {
            meta: Update_Meta_Contratist_Dto,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}

