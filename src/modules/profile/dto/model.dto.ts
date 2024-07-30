

import { voiceSpecialty_default, Singer_voiceSpecialty_Type, voiceType_default, Singer_voiceType_Type } from "@tesis-project/dev-globals/dist/modules/profile/interfaces";
import { Type } from "class-transformer";
import { IsArray, ValidateNested, IsIn, IsOptional } from "class-validator";


export class Singer_Dto {

    @IsArray()
    // @ValidateNested({ each: true })
    @IsIn(voiceSpecialty_default, { each: true })
    voice_specialty: Singer_voiceSpecialty_Type[];

    @IsArray()
    // @ValidateNested({ each: true })
    @IsIn(voiceType_default, { each: true })
    voice_type: Singer_voiceType_Type[];

}

class Skills_Dto {

    @IsOptional()
    @ValidateNested()
    @Type(() => Singer_Dto)
    singer?: Singer_Dto;

    // @IsOptional()
    // @ValidateNested()
    // @Type(() => Instrumentist_Dto)
    // instrumentist?: Instrumentist_Dto;

    // @IsOptional()
    // @ValidateNested()
    // @Type(() => Orquests_director_Dto)
    // orquests_director?: Orquests_director_Dto;

    // @IsOptional()
    // @ValidateNested()
    // @Type(() => Scenes_director_Dto)
    // scenes_director?: Scenes_director_Dto;

}

export class Model_Dto {

    @ValidateNested()
    @Type(() => Skills_Dto)
    skills: Skills_Dto;

}