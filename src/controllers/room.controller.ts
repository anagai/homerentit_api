import { v4 as uuid } from 'uuid';
import { Controller, Inject, Param, Get, Post, Put, Delete, Body, NotFoundException } from '@nestjs/common';
import { IRoomService } from 'src/services/room-service.interface';
import { room as Room } from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import AddRoomRequestDto from 'src/DTO/add-room-request.dto';
import UpdateRoomRequestDto from 'src/DTO/update-room-request.dto';
import IdRequestDto from 'src/DTO/id-request.dto';
import ErrorHandlerHelper from 'src/helpers/error-handler.helper';

@Controller('room')
export default class RoomController {
  constructor(
    @Inject(IocTypes.IRoomService) private readonly _roomService: IRoomService
  ) {}

    @Post()
    async add(@Body() request: AddRoomRequestDto): Promise<Room> {
       try {
        return await this._roomService.addRoom({id: uuid(), name: request.name} as Room);
       } catch (error) {
        console.error("Error in RoomController.add:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
       } 
    }

    @Put()
    async update(@Body() request: UpdateRoomRequestDto): Promise<Room> {
        try {
          return await this._roomService.updateRoom(request as Room);
        } catch (error) {
          console.error("Error in RoomController.update:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
    }

    @Get(':id')
    async getById(@Param() params: IdRequestDto): Promise<Room> {
        try {
          const result = await this._roomService.getRoomById(params.id);
          if (!result) {
            throw new NotFoundException('Room not found');
          }
          return result;
        } catch(error) {
          console.error("Error in RoomController.getById:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
    }

    @Get()
    async getAll(): Promise<Room[]> {
        try {
          return await this._roomService.getAllRooms();
        } catch(error) {
          console.error("Error in RoomController.getAll:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
        
    }

    @Delete(':id')
    async removeById(@Param() params: IdRequestDto): Promise<boolean> {
        try {
          return await this._roomService.removeRoomById(params.id);
        } catch (error) {
          console.error("Error in RoomController.removeById:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
    }
}
