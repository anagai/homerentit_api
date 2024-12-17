import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsRequiredString, IsRequiredId } from '../decorators/validation.decorators';

export default class UpdateRoomRequestDto {
    
    @IsRequiredId()
    id: string;
    
    @IsRequiredString(50)
    name: string;

}