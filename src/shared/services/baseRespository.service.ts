import { mongoose } from "@typegoose/typegoose";
import { QueryWithHelpers, HydratedDocument } from "mongoose";

export interface IKeyValue {
    key : string;
    value : string;
};

export class BaseRepository {

    constructor() {

    }


    /**
     * Creates a json query for mongoDB, replacing placeholders with dynamic IKeyValue pairings
     * @param data json. A json object describing the mongoDB query with dynamic placeholders (i.e. query params)
     * @param params A dynamic array of IKeyValues which are used to replace placeholders in the json object
     * @returns json, updated with query params
     * @example this.createQuery(someImportJSON, {key: 'key1', value:'value1'}, {key: 'key2', value:'value2'}, ... , ...})
     */
    protected createQuery(data: object, ...params: IKeyValue[]): any {
        
        let json = JSON.stringify(data);

        params.forEach((item) => {
            const expression = `{{${item.key}}}`;
            const regex = new RegExp(expression, 'g');
            json = json.replace(regex, item.value)            
        })

        return JSON.parse(json);
    }

    /**
     * Selects a single record for a given mongoDB query
     * @param query MongoDB query which expects one result
     * @returns null OR matching result as type TEntity
     * @example await this.singleAsync(this.entity.findById<EntityType>(someId));
     */
    protected async singleAsync<TEntity>(
        query: QueryWithHelpers<HydratedDocument<TEntity, any, any> | null, HydratedDocument<TEntity, any, any>, any, TEntity>
        ) : Promise<TEntity> {
        const result = await query.exec();
        return result?.toObject();    
    }

    /**
     * Selects many records for a given mongoDB query
     * @param query MongoDB query which expects many results (i.e. a collection)
     * @returns null OR matching results as array of type TEntity
     * @example await this.manyAsync(this.entity.find<EntityType>());
     */    
    protected async manyAsync<TEntity>(
        query: QueryWithHelpers<HydratedDocument<TEntity, any, any> | null, HydratedDocument<TEntity, any, any>, any, TEntity>
        ) : Promise<TEntity> {
        const result = await query.exec();
        return result?.map(r => r.toObject());    
    }

    /**
     * A wrapper method which handles opening and closing of database for a callback 'dDbConn'
     * @param onDbConn Function<TResult>: A callback function that takes a parameter of 'db' and returns TResult
     * @returns TResult
     * @example return await this.usingDbAsync<AnEntity>(async db => { ... your code that returns 'AnEntity' ... });
     */
    protected async usingDbAsync<TResult>(onDbConn: (db: typeof mongoose) => Promise<TResult>) : Promise<TResult> {
        const db = await mongoose.connect('mongodb://localhost:27018', {  dbName: 'test' });
        const result = await onDbConn(db);
        await db.connection.close();
        return result;
    }  

}