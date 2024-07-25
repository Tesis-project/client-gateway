
import { Controller, Get, Body, Param, Inject, ParseUUIDPipe, Put, Post, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { User_I } from '@tesis-project/dev-globals/dist/modules/user/interfaces';

import {
    fileValidatorFilter_IMAGE,
    fileValidatorFilter_DOCUMENT,
    fileValidatorFilter_VIDEO
} from '@tesis-project/dev-globals/dist/modules/media/validations';
import { NATS_SERVICE } from '../../../core/config/services';
import { Auth } from '../../../core/decorators';
import { User_Auth } from '../../auth/decorators';
import { gw_UpdateProfileDto } from '../dto/update-profile.dto';

@Auth()
@Controller('profile')
export class ProfileController {


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

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

        return this.client.send('profile.update', {
            _id: id,
            ...updateProfileDto
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @Post('profile_pic')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter_IMAGE }))
    async profile_pic(
        @UploadedFile() file: Express.Multer.File,
        @User_Auth() user_auth: User_I
    ) {

        if (!file) {
            throw new RpcException('No file uploaded');
        }

        const fileBase64 = file.buffer.toString('base64');

        return this.client.send('profile.profile_pic.media', {
            file: {
                ...file,
                buffer: fileBase64,
            },
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Post('profile_cover')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter_IMAGE }))
    async profile_cover(
        @UploadedFile() file: Express.Multer.File,
        @User_Auth() user_auth: User_I
    ) {

        if (!file) {
            throw new RpcException('No file uploaded');
        }

        const fileBase64 = file.buffer.toString('base64');

        return this.client.send('profile.profile_cover.media', {
            file: {
                ...file,
                buffer: fileBase64,
            },
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Post('credentials_identity_file')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter_DOCUMENT }))
    async credentials_identity_file(
        @UploadedFile() file: Express.Multer.File,
        @User_Auth() user_auth: User_I
    ) {

        if (!file) {
            throw new RpcException('No file uploaded');
        }

        const fileBase64 = file.buffer.toString('base64');

        return this.client.send('profile.credentials_identity_file.media', {
            file: {
                ...file,
                buffer: fileBase64,
            },
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Post('profesional_file')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter_DOCUMENT }))
    async profesional_file(
        @UploadedFile() file: Express.Multer.File,
        @User_Auth() user_auth: User_I
    ) {

        if (!file) {
            throw new RpcException('No file uploaded');
        }

        const fileBase64 = file.buffer.toString('base64');

        return this.client.send('profile.profesional_file.media', {
            file: {
                ...file,
                buffer: fileBase64,
            },
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Post('image_gallery')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter_IMAGE }))
    async add_image_gallery(
        @UploadedFile() file: Express.Multer.File,
        @User_Auth() user_auth: User_I
    ) {

        if (!file) {
            throw new RpcException('No file uploaded');
        }

        const fileBase64 = file.buffer.toString('base64');

        return this.client.send('profile.image_gallery.media.add', {
            file: {
                ...file,
                buffer: fileBase64,
            },
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Delete('image_gallery/:id')
    async remove_image_gallery(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('profile.image_gallery.media.remove', {
            _id,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Post('video_gallery')
    @UseInterceptors(FileInterceptor('file', { fileFilter: fileValidatorFilter_VIDEO }))
    async add_video_gallery(
        @UploadedFile() file: Express.Multer.File,
        @User_Auth() user_auth: User_I
    ) {

        if (!file) {
            throw new RpcException('No file uploaded');
        }

        const fileBase64 = file.buffer.toString('base64');

        return this.client.send('profile.video_gallery.media.add', {
            file: {
                ...file,
                buffer: fileBase64,
            },
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

    @Delete('video_gallery/:id')
    async remove_video_gallery(
        @Param('id', ParseUUIDPipe) _id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('profile.video_gallery.media.remove', {
            _id,
            user_auth,
        }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );

    }

}

