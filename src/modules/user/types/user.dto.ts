import { AutoMap } from '@automapper/classes';
import {
    IsEmail,
    IsNotEmpty,
    MaxLength
} from 'class-validator'

export class UserDto {

    _id: string;

    @AutoMap()
    @MaxLength(75)
    @IsNotEmpty()
    givenName: string;

    @AutoMap()  
    @MaxLength(75)
    @IsNotEmpty()
    lastName: string;

    fullName: string;

    @AutoMap()
    @MaxLength(255)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @AutoMap()
    created: string;
}
