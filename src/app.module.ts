import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PropertyController } from './controllers/property.controller';
import { PropertyService } from './services/property.service';
import { PrismaClient } from '@prisma/client';
import IocTypes from './types/ioc-types';
import DataAccessWrapper from './data/data-access-wrapper';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    PropertyController,
    RoomController
  ],
  providers: [
    AppService,
    { provide: IocTypes.IPropertyService, useClass: PropertyService },
    { provide: IocTypes.IPrismaClient, useClass: PrismaClient },
    { provide: IocTypes.IDataAccessWrapper, useClass: DataAccessWrapper },
    { provide: IocTypes.IRoomService, useClass: RoomService }
  ],
})
export class AppModule {}
