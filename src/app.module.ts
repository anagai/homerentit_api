import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import IocTypes from './types/ioc-types';
import DataAccessWrapper from './data/data-access-wrapper';
import DataMapper from './data/data-mapper';
import {
  PropertyService,
  AmenityService,
  AppService,
  RoomService,
  PropertyAmenityService
} from './services'
import { 
  PropertyController,
  RoomController,
  AppController,
  AmenityController,
  PropertyAmenityController
} from './controllers'

@Module({
  imports: [],
  controllers: [
    AppController,
    PropertyController,
    RoomController,
    AmenityController,
    PropertyAmenityController
  ],
  providers: [
    AppService,
    { provide: IocTypes.IPropertyService, useClass: PropertyService },
    { provide: IocTypes.IPrismaClient, useClass: PrismaClient },
    { provide: IocTypes.IDataAccessWrapper, useClass: DataAccessWrapper },
    { provide: IocTypes.IAmenityService, useClass: AmenityService },
    { provide: IocTypes.IRoomService, useClass: RoomService },
    { provide: IocTypes.IDataMapper, useClass: DataMapper },
    { provide: IocTypes.IPropertyAmenityService, useClass: PropertyAmenityService }
  ],
})
export class AppModule {}
