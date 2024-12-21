import { v4 as uuid } from 'uuid';
import { Controller, Inject, Param, Get, Post, Put, Delete, Body, NotFoundException } from '@nestjs/common';
import { IPropertyService } from 'src/services/property-service.interface';
import IocTypes from 'src/types/ioc-types';
import { property as Property } from '@prisma/client';
import ErrorHandlerHelper from 'src/helpers/error-handler.helper';
import AddPropertyRequestDto from 'src/DTO/add-property-request.dto';
import UpdatePropertyRequestDto from 'src/DTO/update-property-request.dto';
import IDataMapper from 'src/data/data-mapper.interface';

@Controller('property')
export default class PropertyController {
  constructor(
    @Inject(IocTypes.IPropertyService) private readonly _propService: IPropertyService,
    @Inject(IocTypes.IDataMapper) private readonly _dataMapper: IDataMapper
  ) {}

  @Post()
  async add(@Body() request: AddPropertyRequestDto): Promise<Property> {
     try {
      const property = await this._dataMapper.mapAddRequestDtoToProperty(request, uuid());
      console.log("PropertyController.add property:", property);
      return await this._propService.addProperty(property);
     } catch (error) {
      console.error("Error in PropertyController.add:", error);
      ErrorHandlerHelper.CatchErrorHandler(error);
     } 
  }

  @Put()
  async update(@Body() request: UpdatePropertyRequestDto): Promise<boolean> {
      try {
        const property = await this._dataMapper.mapUpdateRequestDtoToProperty(request);
        return await this._propService.updateProperty(property);
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




}
