
import { Controller, Get, Inject, Param, ParseUUIDPipe } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";

import { User_I } from "@tesis-project/dev-globals/dist/modules/user/interfaces";

import { NATS_SERVICE } from "../../../core/config/services";
import { Auth } from "../../../core/decorators";
import { User_Auth } from "../../auth/decorators";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Client gateway - User - /hiring-data')
@Auth()
@Controller('user/hiring-data')
export class Hiring_Data_Controller {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

        @ApiOperation({ summary: 'Obtener información de contratación de un usuario por id' })
    @Get(':id')
    get_hiring_data(
        @Param('id', ParseUUIDPipe) id: string,
        @User_Auth() user_auth: User_I

    ) {

        return this.client.send( 'user.hiring_data.get_one', {
            _id: id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}


