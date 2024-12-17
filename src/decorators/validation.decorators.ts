import { applyDecorators } from '@nestjs/common';
import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export function IsRequiredString(maxLength: number | undefined = undefined) {
    let decorators = [IsString(), IsNotEmpty()];
    if (maxLength) {
        decorators.push(MaxLength(maxLength));
    }
    return applyDecorators(...decorators);
}

export function IsRequiredId() {
    return applyDecorators(
        IsString(),
        MaxLength(36),
        IsUUID());
}