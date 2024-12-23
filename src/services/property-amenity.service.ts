import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import IDataAccessWrapper from 'src/data/data-access-wrapper.interface';
import { property_amenity as PropertyAmenity, amenity as Amenity } from '@prisma/client';
import IocTypes from 'src/types/ioc-types';
import { Tables } from 'src/constants';
import IPropertyAmenityService from './property-amenity-service.interface';

@Injectable()
export default class PropertyAmenityService implements IPropertyAmenityService {
  
  constructor(
      @Inject(IocTypes.IDataAccessWrapper) private readonly _dbAccess: IDataAccessWrapper
    ) {}

    async addPropertyAmenity(propAmenity: PropertyAmenity): Promise<PropertyAmenity> {
        return await this._dbAccess.add<PropertyAmenity>(Tables.PROPERTY_AMENITY, propAmenity);
    }

    async removePropertyAmenity(propAmenity: PropertyAmenity): Promise<PropertyAmenity> {
        return await this._dbAccess.delete<PropertyAmenity>(Tables.PROPERTY_AMENITY, {
          property_id: propAmenity.property_id,
          amenity_id: propAmenity.amenity_id
        });
      }
  
      async getPropertyAmenities(propertyId: string): Promise<Amenity[]>{
        const result = await this._dbAccess.getClient().property_amenity.findMany({
              where: {
                property_id: propertyId,
              },
              include: { // get the amenity name from joined table
                amenity: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            });
          // Need to do this because result has extra un-needed fields
          const amenities = result.map((a: any) => {
              return {
                  id: a.amenity.id,
                  name: a.amenity.name
              }
          });
          return amenities;
      }

}