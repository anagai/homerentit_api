import { Inject, Injectable } from '@nestjs/common';
import { IPropertyService } from './property-service.interface';
import { 
  room as Room
} from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import IDataAccessWrapper from 'src/data/data-access-wrapper.interface';
import { Tables } from '../constants'
import { IRoomService } from './room-service.interface';

@Injectable()
export class RoomService implements IRoomService {
  
  constructor(
      @Inject(IocTypes.IDataAccessWrapper) private readonly _dbAccess: IDataAccessWrapper
    ) {}

    async addRoom(room: Room): Promise<Room | null> {
        return await this._dbAccess.add<Room>(Tables.ROOM, room);
    }

    async updateRoom(room: Room): Promise<Room | null> {
        return await this._dbAccess.update<Room>(Tables.ROOM, room );
    }

    async getRoomById(id: string): Promise<Room | null>{
        return await this._dbAccess.getById<Room>(Tables.ROOM, id);
    }

    async getAllRooms(): Promise<Room[] | []>{
        return await this._dbAccess.getAll<Room>(Tables.ROOM);
    }

    async removeRoomById(id: string): Promise<boolean> {
        return await this._dbAccess.delete(Tables.ROOM, { id });
    }
}
