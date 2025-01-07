import { property as Property } from '@prisma/client';
import AddPropertyRequestDto from "src/DTO/add-property-request.dto";
import UpdatePropertyRequestDto from 'src/DTO/update-property-request.dto';
import { Injectable, Inject } from '@nestjs/common';
import Decimal from 'decimal.js';
import IocTypes from 'src/types/ioc-types';
import IPrismaClient from './prisma-client.interface';
import IDataMapper from './data-mapper.interface';
import PropertyResponseDto from 'src/DTO/property-response.dto';

@Injectable()
export default class DataMapper implements IDataMapper{
    
    constructor(
        @Inject(IocTypes.IPrismaClient) private readonly _dbClient: IPrismaClient
    ) {}

    mapAddRequestDtoToProperty(dto: AddPropertyRequestDto, id: string): Property {
        const property: Property = {
            id,
            title: dto.title,
            area_info: dto.areaInfo,
            price: new Decimal(dto.price), // convert string to Decimal
            description: dto.description,
            max_guests: dto.maxGuests,
            city: dto.city,
            state: dto.state,
            photos: dto.photos || ''
        };
        return property;
    }

    mapUpdateRequestDtoToProperty(dto: UpdatePropertyRequestDto): Property {
        const property: Property = {
            id: dto.id,
            title: dto.title,
            area_info: dto.areaInfo,
            price: new Decimal(dto.price),
            description: dto.description,
            max_guests: dto.maxGuests,
            city: dto.city,
            state: dto.state,
            photos: dto.photos || ''
        };
        return property;
    }

    mapPropertyToResponseDto(property: Property): PropertyResponseDto {
        const response: PropertyResponseDto = {
            id: property.id,
            title: property.title,
            description: property.description,
            city: property.city,
            state: property.state,
            areaInfo: property.area_info,
            maxGuests: property.max_guests,
            price: property.price.toFixed(2), // Convert price to string
            photos: property.photos
        }
        return response;
    }
   
}