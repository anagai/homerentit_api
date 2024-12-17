import { TableNames } from '../types/database.model';
import IPrismaClient from './prisma-client.interface';

export default interface IDataAccessWrapper {
  add<T>(tableName: TableNames, record: any): Promise<T | null>;
  update<T>(tableName: TableNames, record: any): Promise<T | null>;
  delete(tableName: TableNames, criteria: object): Promise<boolean>;
  getById<T>(tableName: TableNames, id: string): Promise<T | null>;
  getAll<T>(tableName: string): Promise<T[]>;
  getClient(): IPrismaClient;
  query(sql: string, values: any[]): Promise<any>
}
