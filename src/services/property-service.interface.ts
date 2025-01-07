import { 
    property as Property
} from '@prisma/client';
import { PropertyView } from 'src/types/database.model';

export interface IPropertyService {
    addProperty(prop: Property): Promise<Property>;
    updateProperty(property: Property): Promise<Property>;
    getPropertyById(id: string): Promise<Property>;
    getAllProperties(): Promise<Property[]>;
    removePropertyById(id: string): Promise<Property>;
    getPropertyView(propertyId: string): Promise<PropertyView | null>;
    addPropertyPhotos(propId: string, photos: string[])
}