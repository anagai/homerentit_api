import {PrismaClient} from '@prisma/client';

export default interface IPrismaClient {
    property: PrismaClient['property'];
    amenity: PrismaClient['amenity'];
    property_amenity: PrismaClient['property_amenity'];
    property_room: PrismaClient['property_room'];
    room: PrismaClient['room'];
    $queryRaw: PrismaClient['$queryRaw'];
 }
