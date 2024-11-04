import { Controller, Get, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SearchSongsDto } from './dto/search-songs.dto';

@Controller({
  path: 'api/songs',
  version: VERSION_NEUTRAL,
})
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('/search')
  search(@Query() searchSongsDto: SearchSongsDto) {
    return this.songsService.search(searchSongsDto);
  }
}
