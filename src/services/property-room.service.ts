import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import IDataAccessWrapper from 'src/data/data-access-wrapper.interface';
import { property_room as PropertyRoom, room as Room } from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import { Tables } from 'src/constants';
import IPropertyRoomService from './property-room-service.interface';

@Injectable()
export default class PropertyRoomService implements IPropertyRoomService {
  
  constructor(
      @Inject(IocTypes.IDataAccessWrapper) private readonly _dbAccess: IDataAccessWrapper
    ) {}

    async addPropertyRoom(propRoom: PropertyRoom): Promise<PropertyRoom> {
        return await this._dbAccess.add<PropertyRoom>(Tables.PROPERTY_ROOM, propRoom);
    }

    async removePropertyRoom(propertyId: string, roomId: string): Promise<PropertyRoom> {
        return await this._dbAccess.delete<PropertyRoom>(Tables.PROPERTY_ROOM, {
          property_id: propertyId,
          room_id: roomId
        });
      }
  
      async getPropertyRooms(propertyId: string): Promise<any[]>{
        const result = await this._dbAccess.getClient().property_room.findMany({
              // Will return all fields in property_room and included fields from room table
              where: {
                property_id: propertyId,
              },
              include: { // get the amenity name from joined table
                room: {
                  select: {
                    id: true,
                    name: true
                  },
                },
              },
            });
          // Need to do this because result has extra un-needed fields
          const rooms = result.map((a: any) => {
              return {
                  id: a.room.id,
                  name: a.room.name,
                  roomCount: a.room_count
              }
          });
          return rooms;
      }

}