import { Controller, Get, Inject, Param, ParseUUIDPipe } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "../../../core/config/services";
import { catchError } from "rxjs";


@Controller('user/hiring-data')
export class Hiring_Data_Controller {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Get(':id')
    get_hiring_data(@Param('id', ParseUUIDPipe) id: string) {

        return this.client.send( 'user.hiring_data.get_one', id).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}
