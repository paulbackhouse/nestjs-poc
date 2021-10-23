import { AutoMap } from '@automapper/classes';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'User', validateBeforeSave: true, autoIndex: false } })
export class UserEntity {

    @AutoMap()
    @prop({ maxLength:75, required: true })
    public givenName: string;

    @AutoMap()
    @prop({ maxLength:75, required: true })
    public lastName: string;

    @AutoMap()
    @prop({ maxLength:255, required: true, index:true })
    public email: string;

    @AutoMap()
    @prop({ required: true })
    public created: Date;
}
