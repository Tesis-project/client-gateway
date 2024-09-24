import { Controller, Inject, Get, Param, ParseUUIDPipe, Body, Post, Delete } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { User_I } from "@tesis-project/dev-globals/dist/modules/user/interfaces";
import { NATS_SERVICE } from "../../../core/config/services";
import { Auth } from "../../../core/decorators";
import { User_Auth } from "../../auth/decorators";

import { Update_Bank_Data_Dto } from "@tesis-project/dev-globals/dist/modules/user/dto";
import { catchError } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Client gateway - User - /hiring-data/bank')
@Auth()
@Controller('user/hiring-data/bank')
export class Bank_Data_Controller {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    @ApiOperation({ summary: 'Guardar información bancaria de usuario' })
    @Post(':hiring_id')
    save_bank_data(
        @Param('hiring_id', ParseUUIDPipe) hiring_id: string,
        @Body() Update_Bank_Data_Dto: Update_Bank_Data_Dto,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('user.hiring_data.bank.save', {
            hiring_id,
            bank: Update_Bank_Data_Dto,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @ApiOperation({ summary: 'Obtener información bancaria de un usuario por id' })
    @Get(':hiring_id')
    find_all(
        @Param('hiring_id', ParseUUIDPipe) hiring_id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('user.hiring_data.bank.find_all', {
            hiring_id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }

    @ApiOperation({ summary: 'Obtener información bancaria de un usuario por id' })
    @Delete(':bank_id')
    delete_paymentInfo(
        @Param('bank_id', ParseUUIDPipe) bank_id: string,
        @User_Auth() user_auth: User_I
    ) {

        return this.client.send('user.hiring_data.bank.delete_paymentInfo', {
            bank_id,
            user_auth
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )

    }


}
