
import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { NATS_SERVICE } from '../../../core/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from '../../../core/decorators';
import { User_Auth } from '../../auth/decorators';
import { User_I } from '@tesis-project/dev-globals/dist/modules/user/interfaces';

import { Create_Postulation_Dto } from '@tesis-project/dev-globals/dist/modules/business/vacants/dto';
import { catchError } from 'rxjs';

import {Evaluate_Postulation_Dto} from '@tesis-project/dev-globals/dist/modules/business/vacants/dto/Evaluate-postulation.dto';


    @Auth()
@Controller('business/vacants/postulations')
export class Business_Vacants_Postulations_Controller {


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post('create/:vacant')
    async create_postulation(
        @Param('vacant', ParseUUIDPipe) vacant_id: string,
        @Body() Create_Postulation_Dto: Create_Postulation_Dto,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.postulations.create', {
            vacant_id,
            body: Create_Postulation_Dto,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Delete(':id')
    delete_postulation(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.postulations.delete_one', {
            _id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Get(':id')
    get_postulations_byVacant(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.postulations.get_byVacants', {
            _id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Post('evaluate/:id')
    evaluate_postulation(
        @Param('id', ParseUUIDPipe) _id: string,
        @Body() Evaluate_Postulation_Dto: Evaluate_Postulation_Dto,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.postulations.evaluate', {
            _id,
            evaluate: Evaluate_Postulation_Dto,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}
