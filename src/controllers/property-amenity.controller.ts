import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import IPropertyAmenityService from "src/services/property-amenity-service.interface";
import IocTypes from "src/types/ioc-types";
import { StatusResponse } from "src/types/status-response.type";
import { property_amenity as PropertyAmenity, amenity as Amenity } from '@prisma/client';
import ResponseHelper from "src/helpers/response-helper";
import ErrorHandlerHelper from "src/helpers/error-handler.helper";
import AddPropertyAmenityRequestDto from "src/DTO/add-property-amenity-request.dto";

@Controller('property/amenity')
export default class PropertyAmenityController {
    
    constructor(
        @Inject(IocTypes.IPropertyAmenityService) private readonly _propertyAmenityService: IPropertyAmenityService
      ) {}
    
    @Post()
    async add(@Body() request: AddPropertyAmenityRequestDto): Promise<StatusResponse> {
        
        try {
            let propAmenity: PropertyAmenity;
            console.log("request:",request);
            for(const item of request.amenities) {
                propAmenity = {property_id: item.propertyId, amenity_id: item.amenityId}
                await this._propertyAmenityService.addPropertyAmenity(propAmenity);
            }
            return ResponseHelper.successResponse();
        } catch (error) {
            console.error("Error in PropertyAmenityController.add:", error);
            ErrorHandlerHelper.CatchErrorHandler(error);
        } 
    }

    @Get(':propertyId')
    async get(@Param('propertyId') propertyId: string): Promise<Amenity[]> {
        try {
        return await this._propertyAmenityService.getPropertyAmenities(propertyId);
        } catch (error) {
        console.error("Error in PropertyAmenityController.get:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
        } 
    }

    @Delete(':propertyId/:amenityId')
    async delete(
        @Param('propertyId') propertyId: string,
        @Param('amenityId') amenityId: string
        ): Promise<StatusResponse> {
        
        try {
        const propAmen: PropertyAmenity = { property_id: propertyId, amenity_id: amenityId };
        await this._propertyAmenityService.removePropertyAmenity(propAmen);
        return ResponseHelper.successResponse();
        } catch (error) {
        console.error("Error in PropertyAmenityController.delete:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
        } 
    }
}