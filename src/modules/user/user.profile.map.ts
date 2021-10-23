import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { UserDto } from './types/user.dto';
import { UserEntity } from './types/user.entiity.schema';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper) => {
            mapper
                .createMap(UserEntity, UserDto)
                .forMember(
                    (dest) => dest._id,
                    mapFrom(src => src._id)
                )
                .forMember(
                    (dest) => dest.fullName,
                    mapFrom(src => src.givenName + ' ' + src.lastName)
                )
                .forMember(
                    (dest) => dest.created,
                    mapFrom(src => src.created?.toISOString())
                );
                
            mapper
                .createMap(UserDto, UserEntity);           
        };
    }
}

