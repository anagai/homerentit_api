import { IsRequiredString } from 'src/decorators/validation.decorators';

export default class AddAmenityRequestDto {
    @IsRequiredString(50)
    name: string;
}