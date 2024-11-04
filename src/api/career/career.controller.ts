import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller({
  path: 'api/career',
  version: VERSION_NEUTRAL,
})
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get('/list-all')
  findAll() {
    return this.careerService.findAll();
  }
}
