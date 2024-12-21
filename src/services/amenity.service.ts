import { Inject, Injectable } from '@nestjs/common';
import {  amenity as Amenity } from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import IDataAccessWrapper from 'src/data/data-access-wrapper.interface';
import { Tables } from '../constants'
import { IAmenityService } from './amenity-service.interface';

@Injectable()
export default class AmenityService implements IAmenityService {
  
  constructor(
      @Inject(IocTypes.IDataAccessWrapper) private readonly _dbAccess: IDataAccessWrapper
    ) {}

    async addAmenity(amenity: Amenity): Promise<Amenity | null> {
        return await this._dbAccess.add<Amenity>(Tables.AMENITY, amenity);
    }

    async updateAmenity(amenity: Amenity): Promise<Amenity | null> {
        return await this._dbAccess.update<Amenity>(Tables.AMENITY, amenity );
    }

    async getAmenityById(id: string): Promise<Amenity | null>{
        return await this._dbAccess.getById<Amenity>(Tables.AMENITY, id);
    }

    async getAllAmenities(): Promise<Amenity[] | []>{
        return await this._dbAccess.getAll<Amenity>(Tables.AMENITY);
    }

    async removeAmenityById(id: string): Promise<boolean> {
        return await this._dbAccess.delete(Tables.AMENITY, { id });
    }
}
