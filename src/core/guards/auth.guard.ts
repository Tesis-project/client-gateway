

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

            const {user, token: newToken } = await firstValueFrom(
                this.client.send('auth.verify.user', token)
            )

            request['auth_user'] = {
                email: user.email,
                created_at: user.created_at,
                status: user.status,
                user: user.user,
                _id: user._id
            }

            request['token'] = newToken;

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