import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRequest } from '@api/shared/decorators/user-token.decorator';
import { IUserPayloadToken } from '@api/auth/entities/auth.entity';

@Controller({
  path: 'api/user',
  version: VERSION_NEUTRAL,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(
    @Body() createUserDto: CreateUserDto,
    @UserRequest() userRequest: IUserPayloadToken,
  ) {
    return this.userService.create(createUserDto, userRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
