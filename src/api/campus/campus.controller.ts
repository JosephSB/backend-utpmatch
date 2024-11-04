import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { CampusService } from './campus.service';

@Controller({
  path: 'api/campus',
  version: VERSION_NEUTRAL,
})
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Get('/list-all')
  findAll() {
    return this.campusService.findAll();
  }
}
