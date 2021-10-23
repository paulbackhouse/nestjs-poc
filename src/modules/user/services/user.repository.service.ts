import { Injectable } from '@nestjs/common';
import { getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';
import { BaseRepository } from 'src/shared/services/baseRespository.service';
import { UserEntity } from '../types/user.entiity.schema'
import * as userByEmailQuery from '../queries/userByEmail.query.json';


@Injectable()
export class UserRepositoryService extends BaseRepository {

    private readonly users: ReturnModelType<typeof UserEntity, BeAnObject>; 

    constructor() {
        super();
        this.users = getModelForClass(UserEntity);
    }

    async createAsync(user: UserEntity) : Promise<UserEntity> {
        return await this.usingDbAsync<UserEntity>(async db => {
            user.created = new Date();
            const result = await this.users.create(user);
            return result.toObject();
        });
    }

    async getAllAsync() : Promise<UserEntity[]> {
        return await this.usingDbAsync<UserEntity[]>(async db => {
            return await this.manyAsync<UserEntity[]>(this.users.find());
        });
    }

    async getByEmailAsync(email: string) : Promise<UserEntity> {
        return await this.usingDbAsync<UserEntity>(async db => {
            const query = this.createQuery(userByEmailQuery, {key:'email', value:email});
            return await this.singleAsync(this.users.findOne(query));
        });
    }    

    async getByIdAsync(id: string) : Promise<UserEntity> {
        return await this.usingDbAsync<UserEntity>(async db => {
            return await this.singleAsync(this.users.findById(id));
        });
    } 
}
