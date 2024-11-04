import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { InterestService } from './interest.service';

@Controller({
  path: 'api/interest',
  version: VERSION_NEUTRAL,
})
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Get('/list-all')
  findAll() {
    return this.interestService.findAll();
  }
}
