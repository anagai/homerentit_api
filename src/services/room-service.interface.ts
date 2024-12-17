import { 
    room as Room
} from '@prisma/client';

export interface IRoomService {
    addRoom(room: Room): Promise<Room | null>;
    updateRoom(room: Room): Promise<Room | null>;
    getRoomById(id: string): Promise<Room | null>;
    getAllRooms(): Promise<Room[] | []>;
    removeRoomById(id: string): Promise<boolean>;
}