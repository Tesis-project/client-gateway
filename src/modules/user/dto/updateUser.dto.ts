import { PartialType } from "@nestjs/mapped-types";
import { CreateUser_Dto, UpdateUser_Dto } from "@tesis-project/dev-globals/dist/modules/user/dto";




export class gw_UpdateUser_Dto extends PartialType(UpdateUser_Dto) {



}