import { PartialType } from '@nestjs/mapped-types';

import { Update_Profile_Dto } from '@tesis-project/dev-globals/dist/modules/profile/dto';

export class gw_UpdateProfileDto extends PartialType(Update_Profile_Dto) {

}
