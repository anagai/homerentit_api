import { property_room as PropertyRoom, room as Room } from "@prisma/client";

export default interface IPropertyRoomService { 
    addPropertyRoom(propRoom: PropertyRoom): Promise<PropertyRoom>;
    removePropertyRoom(propertyId: string, roomId: string): Promise<PropertyRoom>;
    getPropertyRooms(propertyId: string): Promise<Room[]>;
}