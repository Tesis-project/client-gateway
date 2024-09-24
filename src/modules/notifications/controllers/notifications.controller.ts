
import { Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../../../core/config/services';
import { User_I } from '@tesis-project/dev-globals/dist/modules/user/interfaces';
import { User_Auth } from '../../auth/decorators';
import { Auth } from '../../../core/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Client gateway - Notify')
@Auth()
@Controller('notify')
export class NotificationsController {


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

        @ApiOperation({ summary: 'Obtener todas las notificaciones de un usuario' })
    @Get()
    get_all(
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('notifications.find', {
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

        @ApiOperation({ summary: 'Definir una notificación como leida' })
    @Put(':id')
    read_notification(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('notifications.read', {
            _id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

        @ApiOperation({ summary: 'Eliminar una notificación' })
    @Delete(':id')
    delete_notification(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('notifications.delete', {
            _id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }


}
