import { IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdateUserDto  {


    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    last_name: string;

    @IsOptional()
    @IsPhoneNumber()
    @MinLength(10)
    phone?: string;


}
