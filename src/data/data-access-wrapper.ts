import type IPrismaClient from './prisma-client.interface';
import IDataAccessWrapper from './data-access-wrapper.interface';
import { TableNames } from '../types/database.model';
import { Prisma } from "@prisma/client";
import { Injectable, Inject } from '@nestjs/common';
import IocTypes from '../types/ioc-types';

@Injectable()
class DataAccessWrapper implements IDataAccessWrapper {

    constructor(
        @Inject(IocTypes.IPrismaClient) private readonly _dbClient: IPrismaClient
    ) {}
    
    async add<T>(tableName: TableNames, record: any): Promise<T | null> {
        const result = await (this._dbClient[tableName] as any).create({data: record});
        console.log('add result:', result);
        return result ?? null;
    }

    async update<T>(tableName: TableNames, record: any): Promise<T | null> {
        const result = await (this._dbClient[tableName] as any).update({ where: { id: record.id }, data: record });
        return result ?? null;
    }

    async delete(tableName: TableNames, criteria: object): Promise<boolean> {
        const keys = Object.keys(criteria);
        let whereCriteria;
        if (keys.length > 1) {
            // if there is more then one crit, need to make a object
            // with crit names combined with _ as a key and add crit to it.
            const combinedKey = keys.join('_');
            whereCriteria = {
                [combinedKey]: criteria,
            };
        } else {
            whereCriteria = criteria;
        }
        const result = await (this._dbClient[tableName] as any).delete({ where: whereCriteria });
        return result !== null;
    }

    async getById<T>(tableName: TableNames, id: string): Promise<T | null>{
        const result = await (this._dbClient[tableName] as any).findUnique({ where: { id } });
        return result ?? null;
    }

    async getAll<T>(tableName: TableNames): Promise<T[] | []>{
        console.log('getAll:', tableName);
        const result = await (this._dbClient[tableName] as any).findMany();
        console.log('results:', result);
        return result ?? [];
    }

    getClient(): IPrismaClient {
        return this._dbClient;
    }

    async query(sql: string, values?: any[]): Promise<any> {
        if(values) {
            return await this._dbClient.$queryRaw(Prisma.sql([sql, ...values]));
        }
        return await this._dbClient.$queryRaw(Prisma.raw(sql));
    }
}

export default DataAccessWrapper;