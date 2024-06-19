import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import helmet from "helmet";

import { envs } from './core/config/envs';
import { ResponseInterceptor } from './core/interceptors';
import { RPC_ExceptionFilter_Custom } from './core/exceptions';

async function bootstrap() {
    const logger = new Logger('Client gateway - Main')

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

        app.use(helmet());

        app.use(express.json({ limit: '10mb' }));

    app.useGlobalFilters(new RPC_ExceptionFilter_Custom());
    app.useGlobalInterceptors(new ResponseInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )

    await app.listen(envs.port);

    logger.log(`Server is running on ${await app.getUrl()}`);

}

bootstrap();
