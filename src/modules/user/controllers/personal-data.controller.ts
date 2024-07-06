import { Body, Controller, Inject, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";

import { Auth } from "../../../core/decorators";
import { NATS_SERVICE } from "../../../core/config/services";

import { User_I } from "@tesis-project/dev-globals/dist/modules/user/interfaces";
import { Update_Personal_Data_Dto } from "@tesis-project/dev-globals/dist/modules/user/dto";
import { User_Auth } from "../../auth/decorators";


@Auth()
@Controller('user/hiring-data/personal')
export class Personal_Data_Controller {


    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post(':hiring_id')
    save_personal(
        @Param('hiring_id', ParseUUIDPipe) hiring_id: string,
        @Body() Update_Personal_Data_Dto: Update_Personal_Data_Dto,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('user.hiring_data.personal.save', {
            hiring_id,
            personal: Update_Personal_Data_Dto,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

}
