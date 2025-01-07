import { IsInt, Min } from "class-validator";
import { IsRequiredString } from "src/decorators/validation.decorators";

export class PropertyRoomDto {

    @IsRequiredString(36)
    propertyId: string;

    @IsRequiredString(36)
    roomId: string;

    @IsInt()
    @Min(1)
    roomCount: number;
}