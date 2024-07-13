
import { BadRequestException, Controller, Inject, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { NATS_SERVICE } from '../../core/config/services';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Media_Format_Enum } from '@tesis-project/dev-globals/dist/modules/media/interfaces';

import { extname } from 'path';
import { fileValidatorFilter } from './validators';



const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

@Controller('media')
export class MediaController {



    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    // @Post()
    // create_mediaRegister( ) {


    //     return {
    //         message: 'Test',
    //     }

    //     // return this.client.send('media.create_media', {})
    //     //     .pipe(
    //     //         catchError(err => {
    //     //             throw new RpcException(err)
    //     //         })
    //     //     )
    // }


    @Post('many')
    @UseInterceptors(FilesInterceptor('file', 10, {
        fileFilter: fileValidatorFilter
    }))
    async uploadFiles( @UploadedFiles() files: Express.Multer.File[] ) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        // Aquí procesas los archivos según tus necesidades
        // Por ejemplo, puedes subirlos a un servicio en la nube como Cloudinary

        return {
            message: 'Files uploaded successfully',
            files: files.map(file => ({
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
            })),
        };
    }

    @Post('single')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: fileValidatorFilter
    }))
    async uploadFile( @UploadedFile() file: Express.Multer.File ) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // Aquí procesas los archivos según tus necesidades
        // Por ejemplo, puedes subirlos a un servicio en la nube como Cloudinary

        return {
            message: 'Files uploaded successfully',
            file: {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
            }
        };
    }

}
