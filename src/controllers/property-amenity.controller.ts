import { Controller, Inject } from "@nestjs/common";
import IPropertyAmenityService from "src/services/property-amenity-service.interface";
import IocTypes from "src/types/ioc-types";

@Controller('property/amenity')
export default class PropertyAmenityController {
    constructor(
        @Inject(IocTypes.IRoomService) private readonly _propertyAmenityService: IPropertyAmenityService
      ) {}
}