import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyRoomDto } from './property-room.dto';

export default class AddPropertyRoomRequestDto {
    
    @IsArray()
    @ValidateNested({ each: true})
    @Type(()=>PropertyRoomDto)
    rooms: PropertyRoomDto[];

}