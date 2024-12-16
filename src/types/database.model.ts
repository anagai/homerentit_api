import IPrismaClient from '../data/prisma-client.interface';

// Table Models
type Property = {
    id: string;
    description: string;
    area_info: string;
    city: string;
    state: string;
}

type Amenity = {
    id: string;
    name: string;
}

type Room = {
    id: string;
    name: string;
}

type PropertyAmenity = {
    property_id: string;
    amenity_id: string;
}

type PropertyRoom = {
    property_id: string;
    room_id: string;
}

type PropertyView = {
    id: string;
    description: string;
    area_info: string;
    city: string;
    state: string;
    amenities: string;
    rooms: string;
}

//Table names as defined in IPrismaClient
type TableNames = keyof IPrismaClient;

export type {
    Property,
    Amenity,
    Room,
    PropertyAmenity,
    PropertyRoom,
    PropertyView,
    TableNames
}