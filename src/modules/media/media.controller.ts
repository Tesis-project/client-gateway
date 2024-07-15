
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseUUIDPipe, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NATS_SERVICE } from '../../core/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';


import { fileValidatorFilter } from './validators';

import { Create_Media_Dto } from '@tesis-project/dev-globals/dist/modules/media/dto/create-media.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { User_Auth } from '../auth/decorators';
import { User_I } from '@tesis-project/dev-globals/dist/modules/user/interfaces';
import { Auth } from '../../core/decorators';


@Auth()
@Controller('media')
export class MediaController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

   @Get('serve/file/:id')
    async serveFile(@Param('id', ParseUUIDPipe) _id: string, @Res() res: Response) {

          try {

            const resp = await firstValueFrom(
                this.client.send('media.serve.file', {
                    _id
                })
            );

            const {
                storageFile,
                contentType
            } = resp.data;

              res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "max-age=60d");
    res.end(storageFile.buffer);

        } catch (error) {
            console.log('el error', error);
            throw new RpcException(error);
        }

    }

    @Post('single')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() Create_Media_Dto: Create_Media_Dto,
        @User_Auth() user_auth: User_I
    ) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

      const fileBase64 = file.buffer.toString('base64');

        return this.client.send('media.create.single', {
            file: {
                ...file,
                buffer: fileBase64,
            },
            data: {
                ...Create_Media_Dto,
            },
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );
    }

    @Put('single/:id')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter }))
    async update_file(@Param('id', ParseUUIDPipe) _id: string, @UploadedFile() file: Express.Multer.File, @User_Auth() user_auth: User_I) {

        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        return this.client.send('media.update.single', {
            _id,
            file,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Delete('single/:id')
    async delete_file(@Param('id', ParseUUIDPipe) _id: string, @User_Auth() user_auth: User_I) {

        return this.client.send('media.delete.single', {
            _id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}
