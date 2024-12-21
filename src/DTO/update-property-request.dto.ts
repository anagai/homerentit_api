import { IsRequiredString } from 'src/decorators/validation.decorators';
import { IsInt, IsNumber, IsString, MaxLength } from 'class-validator';


export default class UpdatePropertyRequestDto {
    
    @IsRequiredString(36)
    id: string;
    
    @IsRequiredString(1000)
    description: string;

    @IsRequiredString(100)
    city: string;

    @IsRequiredString(2)
    state: string;

    @IsString()
    @MaxLength(1000)
    area_info

    @IsInt()
    max_guests: number;

    @IsNumber()
    price: number;
}