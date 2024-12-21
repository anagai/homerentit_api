import AddPropertyRequestDto from "src/DTO/add-property-request.dto";
import { property as Property } from '@prisma/client';
import UpdatePropertyRequestDto from "src/DTO/update-property-request.dto";

export default interface IDataMapper {
    mapAddRequestDtoToProperty(dto: AddPropertyRequestDto, id: string): Promise<Property>;
    mapUpdateRequestDtoToProperty(dto: UpdatePropertyRequestDto): Promise<Property>;
}