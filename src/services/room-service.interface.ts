import { 
    room as Room
} from '@prisma/client';

export interface IRoomService {
    addRoom(room: Room): Promise<Room>;
    updateRoom(room: Room): Promise<Room>;
    getRoomById(id: string): Promise<Room>;
    getAllRooms(): Promise<Room[]>;
    removeRoomById(id: string): Promise<Room>;
}