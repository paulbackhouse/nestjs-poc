import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { UserDto } from '../types/user.dto';
import { UserEntity } from '../types/user.entiity.schema';
import { UserRepositoryService } from './user.repository.service'

@Injectable()
export class UserService {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly logger: LoggerService,
        private readonly userRepositoryService: UserRepositoryService
        ) {

    }

    async createAsync(user: UserDto) : Promise<UserDto> {
        
        await this.validateAsync(user);

        this.logger.info('User Account: Creating', user);
        
        try {
            const entity = this.toEntity(user);
            const result = await this.userRepositoryService.createAsync(entity);
            this.logger.info('User Account: Created', result);
            
            return this.toDto(result);
        } catch (err) {
            this.logger.error('User Account: Failed to create', err);
            throw err;
        }
    }
    
    async getAllAsync() : Promise<UserDto[]> {
        const users =  await this.userRepositoryService.getAllAsync();
        return users.map(u => this.toDto(u));
    }

    async getByIdAsync(id: string) : Promise<UserDto> {
        const user = await this.userRepositoryService.getByIdAsync(id);
        return await this.toDto(user);
    }

    // private

    private toDto(user: UserEntity) : UserDto {
        return this.mapper.map(user, UserDto, UserEntity);
    }

    private toEntity(user: UserDto) : UserEntity {
        return this.mapper.map(user, UserEntity, UserDto);
    }    

    private async validateAsync(user: UserDto): Promise<void> {
        const match = await this.userRepositoryService.getByEmailAsync(user.email);
        if (match) {
            throw new Error(`A user with email ${user.email} already exists`);
        }
    }


}
