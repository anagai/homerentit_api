import { IsRequiredString } from 'src/decorators/validation.decorators';

export default class AddRoomRequestDto {
    @IsRequiredString(50)
    name: string;
}