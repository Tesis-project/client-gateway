

import { Controller, Inject, Get, Param, ParseUUIDPipe, Put, Delete, Post, Body, UploadedFile, UseInterceptors, UsePipes } from "@nestjs/common"
import { ClientProxy, RpcException } from "@nestjs/microservices"
import { catchError } from "rxjs"
import { NATS_SERVICE } from "../../../core/config/services"
import { Auth } from "../../../core/decorators"

import { FileInterceptor } from "@nestjs/platform-express"
import { fileValidatorFilter_IMAGE } from "@tesis-project/dev-globals/dist/modules/media/validations"
import { User_I } from "@tesis-project/dev-globals/dist/modules/user/interfaces"
import { User_Auth } from "../../auth/decorators"

import { Create_Vacant_Dto } from '@tesis-project/dev-globals/dist/modules/business/vacants/dto/Create-vacant.dto';

import { ParseBodyInterceptor } from '@tesis-project/dev-globals/dist/core/interceptors';

import { Body_Create_Vacant_Dto } from "../dto/Create-Vacant.dto"

import { Search_Vacant_Dto } from '@tesis-project/dev-globals/dist/modules/business/vacants/dto';


@Controller('business/vacants')
export class Business_Vacants_Controller {


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Auth()
    @Post('create')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter_IMAGE }), ParseBodyInterceptor)
    async add_image_gallery(
        @UploadedFile() file: Express.Multer.File,
        @Body() createVacantDto: Create_Vacant_Dto,
        @User_Auth() user_auth: User_I
    ) {

        let aux_file = null;

        if (!file) {
            aux_file = null;
        } else {
            const fileBase64 = file.buffer.toString('base64');
            aux_file = {
                ...file,
                buffer: fileBase64
            }
        }

        return this.client.send('business.vacant.create_vacant', {
            body: createVacantDto,
            file: aux_file,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Auth()
    @Get('get_all_own')
    get_own_allVacants(
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.get_all_own', {
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Get(':id')
    get_vacant(@Param('id', ParseUUIDPipe) _id: string) {

        return this.client.send('business.vacant.get_vacant', {
            _id
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Put(':id')
    edit_vacant(@Param('id', ParseUUIDPipe) _id: string) {

        return this.client.send('business.vacant.edit_vacant', {
            _id
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Auth()
    @Delete(':id')
    delete_vacant(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('business.vacant.delete_one', {
            _id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Post('get_all_public')
    get_public_allVacants(
        @Body() Search_Vacant_Dto: Search_Vacant_Dto
    ) {

        return this.client.send('business.vacant.get_all_public', {
            type: Search_Vacant_Dto
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }



}
