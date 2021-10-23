import {
    IsNotEmpty,
    MaxLength
} from 'class-validator'

export class EventMessageDto {

    @MaxLength(255)
    @IsNotEmpty()
    message: string;

}
