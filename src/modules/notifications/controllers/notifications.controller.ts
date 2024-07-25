
import { Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../../../core/config/services';
import { User_I } from '@tesis-project/dev-globals/dist/modules/user/interfaces';
import { User_Auth } from '../../auth/decorators';
import { Auth } from '../../../core/decorators';

@Auth()
@Controller('notify')
export class NotificationsController {


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

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

    // @Post()
    // create_notification(
    //     @Body() createNotificationDto: Create_Notification_Dto
    // ) {

    //     return this.client.send('notifications.create', createNotificationDto).pipe(
    //         catchError(err => {
    //             throw new RpcException(err)
    //         })
    //     )
    // }

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
