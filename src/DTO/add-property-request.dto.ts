import { IsRequiredString } from 'src/decorators/validation.decorators';
import { IsCurrency, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';


export default class AddPropertyRequestDto {
    
    @IsRequiredString(255)
    title: string;

    @IsRequiredString(1000)
    description: string;

    @IsRequiredString(100)
    city: string;

    @IsRequiredString(2)
    state: string;

    @IsString()
    @MaxLength(1000)
    areaInfo: string;

    @IsInt()
    @Min(1)
    maxGuests: number;

    @IsRequiredString()
    @IsCurrency()
    price: string;

    @IsString()
    @IsOptional()
    photos: string;

}