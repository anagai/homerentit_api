import { IsNotEmpty, IsString, MaxLength, IsUUID } from 'class-validator';
import { IsRequiredId } from 'src/decorators/validation.decorators';

export default class IdRequestDto {
    @IsRequiredId()
    id: string;
}