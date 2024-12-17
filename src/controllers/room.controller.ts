import { v4 as uuid } from 'uuid';
import { Controller, Inject, Param, Get, Post, Put, Delete, Body, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { SanitizePipe } from 'src/pipes/sanitize.pipe';
import { IRoomService } from 'src/services/room-service.interface';
import { room as Room } from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import AddRoomRequestDto from 'src/DTO/add-room-request.dto';
import UpdateRoomRequestDto from 'src/DTO/update-room-request.dto';
import IdRequestDto from 'src/DTO/id-request.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('room')
export class RoomController {
  constructor(
    @Inject(IocTypes.IRoomService) private readonly _roomService: IRoomService
  ) {}

    @Post()
    async addRoom(@Body() request: AddRoomRequestDto): Promise<Room> {
        console.log("addRoom request:",request);
        const room = {id: uuid(), name: request.name} as Room;
        const result = await this._roomService.addRoom(room);
        return result;
    }

    @Put()
    async updateRoom(@Body() request: UpdateRoomRequestDto): Promise<Room> {
        console.log("updateRoom request:",request);
        const room = request as Room;
        const result = await this._roomService.updateRoom(room);
        return result;
    }

    @Get(':id')
    async getById(@Param() params: IdRequestDto): Promise<Room> {
        console.log("getById request:", params.id);
        const result = await this._roomService.getRoomById(params.id);
        if (!result) {
          throw new NotFoundException('Room not found');
        }
        return result;
    }

    @Get()
    async getAll(): Promise<Room[]> {
        console.log("getAll request:");
        const result = await this._roomService.getAllRooms();
        return result;
    }

    @Delete(':id')
    async removeById(@Param() params: IdRequestDto): Promise<boolean> {
        console.log("removeById request:", params.id);
        let result;
        try {
          result = await this._roomService.removeRoomById(params.id);
        } catch (error) {
          if(error instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException('Record not found');
          } else {
            throw error;
          }
        }
        
        return result;
    }
}
