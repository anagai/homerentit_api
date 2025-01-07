import { IsRequiredString } from 'src/decorators/validation.decorators';
import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { property as Property } from '@prisma/client';


export default class UpdatePropertyRequestDto {
    
    @IsRequiredString(36)
    id: string;
    
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
    maxGuests: number;

    @IsNumber()
    price: number;

    @IsString()
    @IsOptional()
    photos: string;
}