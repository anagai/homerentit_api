import { IsArray, ValidateNested } from 'class-validator'
import { PropertyAmenityDto } from './property-amenity.dto';
import { Type } from 'class-transformer';

export default class AddPropertyAmenityRequestDto {
    
    @IsArray()
    @ValidateNested({ each: true})
    @Type(()=>PropertyAmenityDto)
    amenities: PropertyAmenityDto[];

}