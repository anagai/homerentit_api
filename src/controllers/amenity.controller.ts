import { v4 as uuid } from 'uuid';
import { Controller, Inject, Param, Get, Post, Put, Delete, Body, NotFoundException } from '@nestjs/common';
import { amenity as Amenity } from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import IdRequestDto from 'src/DTO/id-request.dto';
import ErrorHandlerHelper from 'src/helpers/error-handler.helper';
import { IAmenityService } from 'src/services/amenity-service.interface';
import AddAmenityRequestDto from 'src/DTO/add-amenity-request.dto';
import UpdateAmenityRequestDto from 'src/DTO/update-amenity-request.dto';

@Controller('amenity')
export default class AmenityController {
  constructor(
    @Inject(IocTypes.IAmenityService) private readonly _amenityService: IAmenityService
  ) {}

    @Post()
    async add(@Body() request: AddAmenityRequestDto): Promise<Amenity> {
      try{
        return await this._amenityService.addAmenity({id: uuid(), name: request.name} as Amenity);
      } catch(error) {
        console.error("Error in AmenityController.add:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
      }  
    }

    @Put()
    async update(@Body() request: UpdateAmenityRequestDto): Promise<Amenity> {
        try {
          return await this._amenityService.updateAmenity(request as Amenity);
        } catch (error) {
          console.error("Error in AmenityController.update:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
    }

    @Get(':id')
    async getById(@Param() params: IdRequestDto): Promise<Amenity> {
        try{
          const result = await this._amenityService.getAmenityById(params.id);
          if (!result) {
            throw new NotFoundException('Room not found');
          }
          return result;
        } catch(error) {
          console.error("Error in AmenityController.getById:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
    }

    @Get()
    async getAll(): Promise<Amenity[]> {
        try {
          return await this._amenityService.getAllAmenities();
        } catch(error) {
          console.error("Error in AmenityController.getAll:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
    }

    @Delete(':id')
    async removeById(@Param() params: IdRequestDto): Promise<boolean> {
        try {
          return await this._amenityService.removeAmenityById(params.id);
        } catch (error) {
          console.error("Error in AmenityController.removeById:", error);
          ErrorHandlerHelper.CatchErrorHandler(error);
        }
    }
}
