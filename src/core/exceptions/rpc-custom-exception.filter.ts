import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { _Response_I } from '@tesis-project/dev-globals/dist/interfaces';

@Catch(RpcException)
export class RPC_ExceptionFilter_Custom implements ExceptionFilter {

    catch(exception: RpcException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const RPC_error = exception.getError();

        if (RPC_error.toString().includes('Empty response')) {

            return response.status(500).json({
                status: 500,
                message: RPC_error.toString().substring(0, RPC_error.toString().indexOf('(') - 1)
            })

        }

        if (typeof RPC_error === 'object' && this.hasResponseStructure(RPC_error)) {

            const status = isNaN(+RPC_error.statusCode) ? 400 : RPC_error.statusCode;
            return response.status(status).json(RPC_error);

        }

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: RPC_error
        });

    }

    hasResponseStructure(obj: any): obj is _Response_I {

        if (typeof obj !== 'object' || obj === null) {
            return false;
        }

        const isResponse = (item: any): boolean => {
            if (typeof item !== 'object' || item === null) {
                return false;
            }

            const responseKeys = ['ok', 'statusCode', 'path', 'data', 'message', 'paginator', 'err', 'context'];

            return responseKeys.some(key => key in item);
        };

        return isResponse(obj);

    }

}