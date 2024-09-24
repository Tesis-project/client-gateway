import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import helmet from "helmet";

import { envs } from './core/config/envs';
import { ResponseInterceptor } from './core/interceptors';
import { RPC_ExceptionFilter_Custom } from './core/exceptions';
import { Media_Format_Enum } from '@tesis-project/dev-globals/dist/modules/media/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger('Client gateway - Main')

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.use(helmet());

    // const allowedOrigins = Config.get(_Configuration_Keys.ALLOWEDORIGINS);
    // app.enableCors({
    //     origin: function (origin, callback) {
    //         // allow requests with no origin
    //         // (like mobile apps or curl requests)
    //         if (!origin) return callback(null, true);

    //         // if (allowedOrigins.indexOf(origin) === -1) {
    //         //     var msg =
    //         //         "Theeee CORS policy for this site does not " +
    //         //         "allow access from the specified Origin.";
    //         //     return callback(new Error(msg), false);
    //         // }
    //         return callback(null, true);
    //     },
    // });

    app.enableCors({
        origin: '*', // ajusta según sea necesario
    });


    app.use(express.json({ limit: '10mb' }));

    app.useGlobalFilters(new RPC_ExceptionFilter_Custom());

    app.useGlobalInterceptors(new ResponseInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    const config = new DocumentBuilder()
        .setTitle('Api - Client gateway')
        .setDescription('Endpoints funcionales para el Api Gateway de la aplicación de Melodify App')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(envs.port);

    logger.log(`Server is running on ${await app.getUrl()}`);
}

bootstrap();
