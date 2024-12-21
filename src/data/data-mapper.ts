import { property as Property } from '@prisma/client';
import AddPropertyRequestDto from "src/DTO/add-property-request.dto";
import UpdatePropertyRequestDto from 'src/DTO/update-property-request.dto';
import { Injectable, Inject } from '@nestjs/common';
import Decimal from 'decimal.js';
import IocTypes from 'src/types/ioc-types';
import IPrismaClient from './prisma-client.interface';
import IDataMapper from './data-mapper.interface';

@Injectable()
export default class DataMapper implements IDataMapper{
    
    constructor(
        @Inject(IocTypes.IPrismaClient) private readonly _dbClient: IPrismaClient
    ) {}

    async mapAddRequestDtoToProperty(dto: AddPropertyRequestDto, id: string): Promise<Property> {
        const property: Property = {
            id,
            area_info: dto.area_info,
            price: new Decimal(dto.price),
            description: dto.description,
            max_guests: dto.max_guests,
            city: dto.city,
            state: dto.state
        };
        return property;
    }

    async mapUpdateRequestDtoToProperty(dto: UpdatePropertyRequestDto): Promise<Property> {
        const property: Property = {
            id: dto.id,
            area_info: dto.area_info,
            price: new Decimal(dto.price),
            description: dto.description,
            max_guests: dto.max_guests,
            city: dto.city,
            state: dto.state
        };
        return property;
    }
}