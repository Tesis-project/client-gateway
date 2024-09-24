

import { Body, Controller, Inject, Post, Query } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "../../../core/config/services";

import { Pagination_Dto } from "@tesis-project/dev-globals/dist/core/dto";
import { SearchUser_Dto } from "@tesis-project/dev-globals/dist/modules/user/dto/search-user.dto";

import { catchError } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Client gateway - User - /search')
@Controller('user/search')
export class UserSearchController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

        @ApiOperation({ summary: 'Obtener todos los usuarios por tipo' })
    @Post('type')
    get_all(
        @Body() SearchUser_Dto: SearchUser_Dto,
        @Query() paginationDto: Pagination_Dto,
    ) {

        return this.client.send('user.search.byType', {
            pagination: paginationDto,
            search: {
                ...SearchUser_Dto
            }
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

    @ApiOperation({ summary: 'Obtener todos los usuarios por término' })
    @Post('term')
    get_byTerm(
        @Query() paginationDto: Pagination_Dto,
        @Body() SearchUser_Dto: SearchUser_Dto,
    ) {

        return this.client.send('user.search.byTerm', {
            pagination: paginationDto,
            search: {
                ...SearchUser_Dto
            }
        }).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

}