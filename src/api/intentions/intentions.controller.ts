import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

import { IntentionsService } from './intentions.service';

@Controller({
  path: 'api/intentions',
  version: VERSION_NEUTRAL,
})
export class IntentionsController {
  constructor(private readonly intentionsService: IntentionsService) {}

  @Get('/list-all')
  findAll() {
    return this.intentionsService.findAll();
  }
}
