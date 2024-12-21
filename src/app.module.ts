import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import IocTypes from './types/ioc-types';
import DataAccessWrapper from './data/data-access-wrapper';
import DataMapper from './data/data-mapper';
import {
  PropertyService,
  AmenityService,
  AppService,
  RoomService
} from './services'
import { 
  PropertyController,
  RoomController,
  AppController,
  AmenityController
} from './controllers'

@Module({
  imports: [],
  controllers: [
    AppController,
    PropertyController,
    RoomController,
    AmenityController
  ],
  providers: [
    AppService,
    { provide: IocTypes.IPropertyService, useClass: PropertyService },
    { provide: IocTypes.IPrismaClient, useClass: PrismaClient },
    { provide: IocTypes.IDataAccessWrapper, useClass: DataAccessWrapper },
    { provide: IocTypes.IAmenityService, useClass: AmenityService },
    { provide: IocTypes.IRoomService, useClass: RoomService },
    { provide: IocTypes.IDataMapper, useClass: DataMapper }
  ],
})
export class AppModule {}
