

import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "../../../core/config/services";
import { Auth } from "../../../core/decorators";
import { User_I } from "@tesis-project/dev-globals/dist/modules/user/interfaces";
import { User_Auth } from "../../auth/decorators";
import { Create_PlanningContract_Dto } from '@tesis-project/dev-globals/dist/modules/business/contracts/dto/Create-PlanningContract.dto';
import { Update_DetailsContract_Dto } from '@tesis-project/dev-globals/dist/modules/business/contracts/dto/Update-DetailsContract.dto';
import { catchError } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Client gateway - Business - /vacants/contracts')
@Auth()
@Controller('business/vacants/contracts')
export class Business_Vacants_Contracts_Controller {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @ApiOperation({ summary: 'Crear propuesta de contrato de un usuario a otro' })
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

    @ApiOperation({ summary: 'Generar documento pre visualización de contrato en PDF' })
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

    @ApiOperation({ summary: 'Actualizar detalles de contrato' })
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

    @ApiOperation({ summary: 'Aceptar propuesta de contrato' })
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

    @ApiOperation({ summary: 'Obtener todos los contratos' })
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

    @ApiOperation({ summary: 'Obtener un contrato por id' })
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

    @ApiOperation({ summary: 'Emitir el envio de propuesta de contrato' })
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