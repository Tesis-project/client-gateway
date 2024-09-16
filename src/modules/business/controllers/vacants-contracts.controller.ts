

import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "../../../core/config/services";
import { Auth } from "../../../core/decorators";
import { User_I } from "@tesis-project/dev-globals/dist/modules/user/interfaces";
import { User_Auth } from "../../auth/decorators";
import { Create_PlanningContract_Dto } from '@tesis-project/dev-globals/dist/modules/business/contracts/dto/Create-PlanningContract.dto';
import { Update_DetailsContract_Dto } from '@tesis-project/dev-globals/dist/modules/business/contracts/dto/Update-DetailsContract.dto';
import { catchError } from "rxjs";

@Auth()
@Controller('business/vacants/contracts')
export class Business_Vacants_Contracts_Controller {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post('create')
    async create(
        @Body() createVacantDto: Create_PlanningContract_Dto,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.contracts.create', {
            body: createVacantDto,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }


    @Get('generate_doc/:id')
    async generate_doc(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.contracts.generate_doc', {
            _id,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Put('update/:id')
    async update_details(
        @Param('id', ParseUUIDPipe) _id: string,
        @Body() createVacantDto: Update_DetailsContract_Dto,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.contracts.update_details', {
            _id: _id,
            body: createVacantDto,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Put('accept/:id')
    async accept(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.contracts.accept', {
            _id,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Get('list')
    async get_all(
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.contracts.get_all', {
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Get(':id')
    async get_one(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.contracts.get_one', {
            _id,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }


    @Post('send_proposal/:id')
    async send_proposal(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.contracts.send_proposal', {
            _id,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

}