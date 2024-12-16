export class Errors {
    public static readonly INVALID_REQUEST = 'Invalid Request';
    public static readonly SERVER_ERROR = 'Internal Server Error';
    public static readonly MISSING_REQUIRED_FIELD = 'Missing Required field';
    public static readonly INVALID_FIELD = 'Invalid Field';
    public static readonly ERROR_UPDATING = 'Error Updating';
    public static readonly ERROR_ADDING = 'Error Adding';
    public static readonly ERROR_DELETING = 'Error Deleting';
    public static readonly ERROR_GETTING = 'Error Getting';
    public static readonly NOT_FOUND = 'Not Found';
    public static readonly NOT_STRING = 'Not String';
    public static readonly NOT_AUTHORIZED = 'Not Authorized';
    public static readonly INVALID_LENGTH = 'Invalid Length';
  }
  
  export class Tables {
    public static readonly PROPERTY = 'property';
    public static readonly AMENITY = 'amenity';
    public static readonly ROOM = 'room';
    public static readonly PROPERTY_AMENITY = 'property_amenity';
    public static readonly PROPERTY_ROOM = 'property_room';
  }
  
  export class Fields {
    public static readonly DESCRIPTION = 'description';
    public static readonly ID = 'id';
    public static readonly NAME = 'name';
    public static readonly AREA_INFO = 'area_info';
    public static readonly CITY = 'city';
    public static readonly STATE = 'state';
    public static readonly PROPERTY_ID = 'property_id';
    public static readonly AMENITY_ID = 'amenity_id';
    public static readonly ROOM_ID = 'room_id';
  }
  
  export class Entities {
    public static readonly PROPERTY = 'Property';
    public static readonly PROPERTIES = 'Properties';
    public static readonly AMENITY = 'Amenity';
    public static readonly AMENITIES = 'Amenities';
    public static readonly ROOM = 'Room';
    public static readonly ROOMS = 'Rooms';
    public static readonly PROPERTY_AMENITY = 'PropertyAmenity';
    public static readonly PROPERTY_AMENITIES = 'PropertyAmenities';
    public static readonly PROPERTY_ROOM = 'PropertyRoom';
    public static readonly PROPERTY_ROOMS = 'PropertyRooms';
    public static readonly PROPERTY_VIEW = 'PropertyView';
    
  }
  
  export class Routes {
    public static readonly NEW = '/new';
    public static readonly NEW_AMENITIES = '/new/amenities';
    public static readonly NEW_ROOMS = '/new/rooms';
    public static readonly NEW_REVIEW = '/new/review';
    public static readonly MANAGE = '/manage';
    public static readonly REVIEW = '/review';
    public static readonly HOME = '/';
  }
  
  export class Storage {
    public static readonly NEW_PROPERTY_DATA = 'newPropertyData';
  }