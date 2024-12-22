import { v4 as uuid } from 'uuid';
import { Controller, Inject, Param, Get, Post, Put, Delete, Body, NotFoundException } from '@nestjs/common';
import { IPropertyService } from 'src/services/property-service.interface';
import IocTypes from 'src/types/ioc-types';
import { property as Property } from '@prisma/client';
import ErrorHandlerHelper from 'src/helpers/error-handler.helper';
import AddPropertyRequestDto from 'src/DTO/add-property-request.dto';
import UpdatePropertyRequestDto from 'src/DTO/update-property-request.dto';
import IDataMapper from 'src/data/data-mapper.interface';
import { Decimal } from '@prisma/client/runtime/library';
import PropertyResponseDto from 'src/DTO/property-response.dto';
import DataMapper from 'src/data/data-mapper';
import IdRequestDto from 'src/DTO/id-request.dto';

@Controller('property')
export default class PropertyController {
  constructor(
    @Inject(IocTypes.IPropertyService) private readonly _propService: IPropertyService,
    @Inject(IocTypes.IDataMapper) private readonly _dataMapper: IDataMapper
  ) {}

  @Post()
  async add(@Body() request: AddPropertyRequestDto): Promise<PropertyResponseDto> {
     try {
      const property = await this._dataMapper.mapAddRequestDtoToProperty(request, uuid());
      const result: Property = await this._propService.addProperty(property);
      return this._dataMapper.mapPropertyToResponseDto(result);
     } catch (error) {
      console.error("Error in PropertyController.add:", error);
      ErrorHandlerHelper.CatchErrorHandler(error);
     } 
  }

  @Put()
  async update(@Body() request: UpdatePropertyRequestDto): Promise<PropertyResponseDto> {
      try {
        const property = await this._dataMapper.mapUpdateRequestDtoToProperty(request);
        const result: Property = await this._propService.updateProperty(property);
        return this._dataMapper.mapPropertyToResponseDto(result);
      } catch (error) {
        console.error("Error in RoomController.update:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
      }
  }

  @Get()
  async getAll(): Promise<Property[]> {
    try {
      return await this._propService.getAllProperties();
    } catch (error) {
      console.error("Error in PropertyController.getAll:", error);
      ErrorHandlerHelper.CatchErrorHandler(error);
    }
  }

  @Get(':id')
  async getById(@Param() params: IdRequestDto): Promise<Property> {
      try {
        const result = await this._propService.getPropertyById(params.id);
        if (!result) {
          throw new NotFoundException('Property not found');
        }
        return result;
      } catch(error) {
        console.error("Error in PropertyController.getById:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
      }
  }

  @Delete(':id')
  async removeById(@Param() params: IdRequestDto): Promise<Property> {
      try {
        return await this._propService.removePropertyById(params.id);
      } catch (error) {
        console.error("Error in PropertyController.removeById:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
      }
  }


}
