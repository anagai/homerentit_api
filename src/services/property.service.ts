import { Inject, Injectable } from '@nestjs/common';
import { IPropertyService } from './property-service.interface';
import { 
  property as Property
} from '@prisma/client';
import { PropertyView } from 'src/types/database.model';
import IocTypes from 'src/types/ioc-types';
import IDataAccessWrapper from 'src/data/data-access-wrapper.interface';
import { Tables } from '../constants'

@Injectable()
export default class PropertyService implements IPropertyService {
  
  constructor(
      @Inject(IocTypes.IDataAccessWrapper) private readonly _dbAccess: IDataAccessWrapper
    ) {}
  
  async addProperty(prop: Property): Promise<Property | null> {
      return await this._dbAccess.add<Property>(Tables.PROPERTY, prop);
  }

  async updateProperty(prop: Property): Promise<boolean> {
      return await this._dbAccess.update(Tables.PROPERTY, prop );
  }

  async getPropertyById(id: string): Promise<Property | null>{
      return await this._dbAccess.getById<Property>(Tables.PROPERTY, id);
  }

  async getAllProperties(): Promise<Property[]> {
    //TODO: Make a property response dto so can convert price to number
    // This should ruturn the dto type
    const properties = await this._dbAccess.getAll<Property>(Tables.PROPERTY);
    return properties.map(p => ({...p, price: p.price.toNumber()}));
  }

  async removePropertyById(id: string): Promise<boolean> {
      return await this._dbAccess.delete(Tables.PROPERTY, { id });
  }

  async getPropertyView(propertyId: string): Promise<PropertyView | null> {
    const sql = `
    SELECT 
            p.id,
            p.description,
            p.area_info,
            p.city,
            p.state,
            COALESCE(STRING_AGG(DISTINCT r.name, ', ') FILTER (WHERE r.id IS NOT NULL), '') AS rooms,
            COALESCE(STRING_AGG(DISTINCT a.name, ', ') FILTER (WHERE a.id IS NOT NULL), '') AS amenities
        FROM 
            property as p
        LEFT JOIN 
            property_room as pr ON p.id = pr.property_id
        LEFT JOIN 
            room as r ON pr.room_id = r.id
        LEFT JOIN 
            property_amenity as pa ON p.id = pa.property_id
        LEFT JOIN 
            amenity as a ON pa.amenity_id = a.id
        WHERE 
            p.id = $1
        GROUP BY 
            p.id;
    `;
    const result = await this._dbAccess.query(sql, [propertyId]);
    return result && result.length>0 ? result[0] as PropertyView : null;
  }
}
