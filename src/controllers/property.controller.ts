import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IPropertyService } from 'src/services/property-service.interface';
import IocTypes from 'src/types/ioc-types';

@Controller('property')
export class PropertyController {
  constructor(
    @Inject(IocTypes.IPropertyService) private readonly _propService: IPropertyService
  ) {}

  @Get()
  async getAllProperties(): Promise<string> {
    console.log("getAllProperties controller");
    const result = await this._propService.getAllProperties();
    console.log("controller result:",result);
    return JSON.stringify(result);
  }

  @Get('amenity/:id')
  getPropertyAmenities(@Param('id') id: string): string {
    return JSON.stringify(this._propService.getPropertyAmenities(id));
  }
}
