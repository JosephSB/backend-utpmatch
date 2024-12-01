import {
  Controller,
  Get,
  Post,
  VERSION_NEUTRAL,
  ParseUUIDPipe,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { UserRequest } from '@api/shared/decorators/user-token.decorator';
import { IUserPayloadToken } from '@api/auth/entities/auth.entity';
import { ListParamsDto } from './dto/list-params.dto';

@Controller({
  path: 'api/match',
  version: VERSION_NEUTRAL,
})
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/create-request/:user_id')
  createRequest(
    @UserRequest() userRequest: IUserPayloadToken,
    @Param('user_id', ParseUUIDPipe) receiver_id: string,
  ) {
    return this.matchService.createRequest(userRequest.user_id, receiver_id);
  }

  @Post('/accept-request/:match_id')
  acceptRequest(
    @UserRequest() userRequest: IUserPayloadToken,
    @Param('match_id', ParseUUIDPipe) match_id: string,
  ) {
    return this.matchService.handleRequest(
      userRequest.user_id,
      match_id,
      'accept',
    );
  }

  @Post('/decline-request/:match_id')
  declineRequest(
    @UserRequest() userRequest: IUserPayloadToken,
    @Param('match_id', ParseUUIDPipe) match_id: string,
  ) {
    return this.matchService.handleRequest(
      userRequest.user_id,
      match_id,
      'decline',
    );
  }

  @Get('/recommendations')
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query() listParamsDto: ListParamsDto,
    @UserRequest() userRequest: IUserPayloadToken,
  ) {
    return this.matchService.recommendations(
      listParamsDto,
      userRequest.user_id,
    );
  }

  @Get('/ranking')
  getRanking() {
    return this.matchService.getRanking();
  }

  @Get('/my-matchs')
  @UsePipes(new ValidationPipe({ transform: true }))
  getMatchs(
    @Query() listParamsDto: ListParamsDto,
    @UserRequest() userRequest: IUserPayloadToken,
  ) {
    return this.matchService.list(listParamsDto, userRequest.user_id, 'accept');
  }

  @Get('/my-pendings')
  @UsePipes(new ValidationPipe({ transform: true }))
  getPendingMatchs(
    @Query() listParamsDto: ListParamsDto,
    @UserRequest() userRequest: IUserPayloadToken,
  ) {
    return this.matchService.list(
      listParamsDto,
      userRequest.user_id,
      'pending',
    );
  }
}
