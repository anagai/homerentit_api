import { 
    property as Property,
    amenity as Amenity
} from '@prisma/client';

export interface IPropertyService {
    getAllProperties(): Promise<Property[] | []>
    getPropertyAmenities(propId: string): Promise<Amenity[] | []>
}