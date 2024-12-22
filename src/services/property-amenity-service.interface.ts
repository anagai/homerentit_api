import { property_amenity as PropertyAmenity, amenity as Amenity } from "@prisma/client";

export default interface IPropertyAmenityService { 
    addPropertyAmenity(propAmenity: PropertyAmenity): Promise<PropertyAmenity>;
    removePropertyAmenity(propAmenity: PropertyAmenity): Promise<PropertyAmenity>;
    getPropertyAmenities(propertyId: string): Promise<Amenity[]>;
}