import { Inject, Injectable } from '@nestjs/common';
import { IPropertyService } from './property-service.interface';
import { 
  property as Property, 
  amenity as Amenity,
  Prisma 
} from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import IDataAccessWrapper from 'src/data/data-access-wrapper.interface';
import { Tables } from '../constants'

@Injectable()
export class PropertyService implements IPropertyService {
  
  constructor(
      @Inject(IocTypes.IDataAccessWrapper) private readonly _dbAccess: IDataAccessWrapper
    ) {}

  async getAllProperties(): Promise<Property[]> {
    console.log("prop service get all")
    return await this._dbAccess.getAll<Property>(Tables.PROPERTY);
  }

  async getPropertyAmenities(propId: string): Promise<Amenity[] | []> {
    
    return [{id: '1234', name: 'wifi'}];
  }
}
