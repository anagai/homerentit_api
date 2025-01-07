import { IsUUID } from 'class-validator'

export class UploadPhotosRequestDto {
    @IsUUID()
    propertyId: string;

}