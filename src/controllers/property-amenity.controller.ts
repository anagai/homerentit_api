import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import AddPropertyAmenityRequestDto from "src/DTO/add-property-amenity-request.dto";
import IPropertyAmenityService from "src/services/property-amenity-service.interface";
import IocTypes from "src/types/ioc-types";
import { StatusResponse } from "src/types/status-response.type";
import { property_amenity as PropertyAmenity } from '@prisma/client';
import ResponseHelper from "src/helpers/response-helper";
import ErrorHandlerHelper from "src/helpers/error-handler.helper";

@Controller('property/amenity')
export default class PropertyAmenityController {
    
    constructor(
        @Inject(IocTypes.IPropertyAmenityService) private readonly _propertyAmenityService: IPropertyAmenityService
      ) {}
    
    @Post(':propertyId/:amenityId')
    async add(
        @Param('propertyId') propertyId: string,
        @Param('amenityId') amenityId: string
        ): Promise<StatusResponse> {
        
        try {
        const propAmen: PropertyAmenity = { property_id: propertyId, amenity_id: amenityId };
        await this._propertyAmenityService.addPropertyAmenity(propAmen);
        return ResponseHelper.successResponse();
        } catch (error) {
        console.error("Error in PropertyAmenityController.add:", error);
        ErrorHandlerHelper.CatchErrorHandler(error);
        } 
    }
}