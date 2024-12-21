import { 
    amenity as Amenity
} from '@prisma/client';

export interface IAmenityService {
    addAmenity(room: Amenity): Promise<Amenity | null>;
    updateAmenity(room: Amenity): Promise<Amenity | null>;
    getAmenityById(id: string): Promise<Amenity | null>;
    getAllAmenities(): Promise<Amenity[] | []>;
    removeAmenityById(id: string): Promise<boolean>;
}