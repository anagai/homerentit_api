import { IsRequiredString, IsRequiredId } from '../decorators/validation.decorators';

export default class UpdateAmenityRequestDto {
    
    @IsRequiredId()
    id: string;
    
    @IsRequiredString(50)
    name: string;

}