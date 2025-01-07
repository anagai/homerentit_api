import { IsRequiredString } from "src/decorators/validation.decorators";

export class PropertyAmenityDto {
    
    @IsRequiredString(36)
    propertyId: string;

    @IsRequiredString(36)
    amenityId: string;

}