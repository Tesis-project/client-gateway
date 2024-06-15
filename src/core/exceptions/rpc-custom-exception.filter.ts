import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { _Response_I } from '../interfaces';

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

        if (
            typeof RPC_error === 'object' && this.isResponseStructure(RPC_error)
        ) {

            const status = isNaN(+RPC_error.statusCode) ? 400 : RPC_error.statusCode;
            return response.status(status).json(RPC_error);

        }

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: RPC_error
        });

    }


    // Función de validación para la estructura de respuesta
    isResponseStructure(obj: any): obj is _Response_I {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            (typeof obj.ok === 'boolean' || obj.ok === undefined) &&
            (typeof obj.statusCode === 'number' || obj.statusCode === undefined) &&
            (typeof obj.path === 'string' || obj.path === undefined) &&
            (obj.data !== undefined) && // You can add more specific checks for the data type if needed
            (typeof obj.message === 'string' || obj.message === undefined) &&
            (typeof obj.paginator === 'object' || obj.paginator === undefined) &&
            (typeof obj.err === 'object' || obj.err === undefined) &&
            (typeof obj.context === 'string' || obj.context === undefined)
        );
    }


}