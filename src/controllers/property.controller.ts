import { v4 as uuid } from 'uuid';
import { Controller, Inject, Param, Get, Post, Put, Delete, Body, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';

import NotFoundException from 'src/exceptions/not-found.exception';
import { IPropertyService } from 'src/services/property-service.interface';
import IocTypes from 'src/types/ioc-types';
import { property as Property } from '@prisma/client';
import ErrorHandlerHelper from 'src/helpers/error-handler.helper';
import AddPropertyRequestDto from 'src/DTO/add-property-request.dto';
import UpdatePropertyRequestDto from 'src/DTO/update-property-request.dto';
import IDataMapper from 'src/data/data-mapper.interface';
import PropertyResponseDto from 'src/DTO/property-response.dto';
import IdRequestDto from 'src/DTO/id-request.dto';
import ResponseHelper from 'src/helpers/response-helper';
import { StatusResponse } from 'src/types/status-response.type';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/middleware/multerConfig';
import { UploadPhotosRequestDto } from 'src/DTO/upload-photos-request.dto';
import { Status } from 'src/constants';

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

  @Post('upload-photos')
  @UseInterceptors(FilesInterceptor('photos', 10, multerConfig))
  async uploadPhotos(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() request: UploadPhotosRequestDto,
    @Req() req: any
  ): Promise<StatusResponse> {
    try {
      console.log("photos:", photos);
      console.log('req uploadedfiles:',req.uploadedFiles);
      //console.log('Image Uploaded:', req.fileName);
      console.log("PropertyId:", request.propertyId);
      await this._propService.addPropertyPhotos(request.propertyId, req.uploadedFiles);
      return ResponseHelper.successResponse();
      //return await this._propService.addPropertyPhoto(request.propertyId, req.fileName);
    } catch(error) {
      console.error('Error in PropertyController.uploadPhotos: ', error);
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

        return result;
      } catch(error) {
        console.error("Error in PropertyController.getById:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
      }
  }

  @Delete(':id')
  async removeById(@Param() params: IdRequestDto): Promise<StatusResponse> {
      try {
        await this._propService.removePropertyById(params.id);
        return ResponseHelper.successResponse();
      } catch (error) {
        console.error("Error in PropertyController.removeById:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
      }
  }


}
