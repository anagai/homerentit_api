const IocTypes = {
    IDataAccessWrapper: Symbol.for("IDataAccessWrapper"),
    IPrismaClient: Symbol.for("IPrismaClient"),
    
    // Services
    IPropertyService: Symbol.for("IPropertyService"),
    IPropertyAmenityService: Symbol.for("IPropertyAmenityService"),
    IPropertyRoomService: Symbol.for("IPropertyRoomService"),
    IRoomService: Symbol.for("IRoomService"),
    IAmenityService: Symbol.for("IAmenityService"),

    // Controllers
    IPropertyController: Symbol.for("IPropertyController"),
    IPropertyAmenityController: Symbol.for("IPropertyAmenityController"),
    IPropertyRoomController: Symbol.for("IPropertyRoomController"),
    IAmenityController: Symbol.for("IAmenityController"),
    IRoomController: Symbol.for("IRoomController"),

}

export default IocTypes