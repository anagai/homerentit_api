import { TableNames } from '../types/database.model';
import IPrismaClient from './prisma-client.interface';
import { property as Property } from "@prisma/client";

export default interface IDataAccessWrapper {
  add<T>(tableName: TableNames, record: any): Promise<T>;
  update<T>(tableName: TableNames, record: any): Promise<T>;
  delete<T>(tableName: TableNames, criteria: object): Promise<T>;
  getById<T>(tableName: TableNames, id: string): Promise<T>;
  getAll<T>(tableName: string): Promise<T[]>;
  getClient(): IPrismaClient;
  query(sql: string, values: any[]): Promise<any>;
}
