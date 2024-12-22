import { 
    amenity as Amenity
} from '@prisma/client';

export interface IAmenityService {
    addAmenity(room: Amenity): Promise<Amenity>;
    updateAmenity(room: Amenity): Promise<Amenity>;
    getAmenityById(id: string): Promise<Amenity>;
    getAllAmenities(): Promise<Amenity[]>;
    removeAmenityById(id: string): Promise<Amenity>;
}