

import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "../../../core/config/services";

import { Pagination_Dto } from "@tesis-project/dev-globals/dist/core/dto";
import { SearchUser_Dto } from "@tesis-project/dev-globals/dist/modules/user/dto/search-user.dto";

import { catchError } from "rxjs";


@Controller('user/search')
export class UserSearchController {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

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