import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import IPropertyRoomService from "src/services/property-room-service.interface";
import IocTypes from "src/types/ioc-types";
import { StatusResponse } from "src/types/status-response.type";
import { property_room as PropertyRoom, room as Room } from '@prisma/client';
import ResponseHelper from "src/helpers/response-helper";
import ErrorHandlerHelper from "src/helpers/error-handler.helper";
import AddPropertyRoomRequestDto from "src/DTO/add-property-room-request.dto";

@Controller('property/room')
export default class PropertyRoomController {
    
    constructor(
        @Inject(IocTypes.IPropertyRoomService) private readonly _propertyRoomService: IPropertyRoomService
      ) {}
    
    @Post()
    async add(@Body() request: AddPropertyRoomRequestDto): Promise<StatusResponse> {
        
        try {
        const propRoom: PropertyRoom = { 
            property_id: request.propertyId, 
            room_id: request.roomId,
            room_count: request.roomCount
        };
        await this._propertyRoomService.addPropertyRoom(propRoom);
        return ResponseHelper.successResponse();
        } catch (error) {
        console.error("Error in PropertyRoomController.add:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
        } 
    }

    @Get(':propertyId')
    async get(@Param('propertyId') propertyId: string): Promise<Room[]> {
        try {
        return await this._propertyRoomService.getPropertyRooms(propertyId);
        } catch (error) {
        console.error("Error in PropertyRoomController.get:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
        } 
    }

    @Delete(':propertyId/:roomId')
    async delete(
        @Param('propertyId') propertyId: string,
        @Param('roomId') roomId: string
        ): Promise<StatusResponse> {
        
        try {
        await this._propertyRoomService.removePropertyRoom(propertyId, roomId);
        return ResponseHelper.successResponse();
        } catch (error) {
        console.error("Error in PropertyRoomController.delete:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
        } 
    }
}