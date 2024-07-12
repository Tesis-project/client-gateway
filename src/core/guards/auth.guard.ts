

import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from '../config/services';
import { _Response_I } from '@tesis-project/dev-globals/dist/core/interfaces';

import { Session_Auth_I } from '@tesis-project/dev-globals/dist/modules/auth/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ){

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {

            const resp: _Response_I<Session_Auth_I> = await firstValueFrom(
                this.client.send('auth.verify.user', token)
            );

            const auth = resp.data;

            request['auth_user'] = {
                email: auth.email,
                created_at: auth.created_at,
                status: auth.status,
                user: auth.user,
                _id: auth._id,
                token: auth.token
            }

        } catch {

            throw new UnauthorizedException();

        }

        return true;

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}