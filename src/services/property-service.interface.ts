import { 
    property as Property
} from '@prisma/client';
import { PropertyView } from 'src/types/database.model';

export interface IPropertyService {
    addProperty(prop: Property): Promise<Property | null>;
    updateProperty(property: Property): Promise<boolean>;
    getPropertyById(id: string): Promise<Property | null>;
    getAllProperties(): Promise<Property[]>;
    removePropertyById(id: string): Promise<boolean>;
    getPropertyView(propertyId: string): Promise<PropertyView | null>;
}