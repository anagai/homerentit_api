import AddPropertyRequestDto from "src/DTO/add-property-request.dto";
import { property as Property } from '@prisma/client';
import UpdatePropertyRequestDto from "src/DTO/update-property-request.dto";
import PropertyResponseDto from "src/DTO/property-response.dto";

export default interface IDataMapper {
    mapAddRequestDtoToProperty(dto: AddPropertyRequestDto, id: string): Property;
    mapUpdateRequestDtoToProperty(dto: UpdatePropertyRequestDto): Property;
    mapPropertyToResponseDto(property: Property): PropertyResponseDto;
}