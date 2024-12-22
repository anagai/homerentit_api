import { IsRequiredString } from 'src/decorators/validation.decorators';

export default class AddPropertyAmenityRequestDto {
    
    @IsRequiredString(36)
    propertyId: string;

    @IsRequiredString(36)
    amenityId: string;
}