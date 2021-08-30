import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/services/users/users.service';
import { MongoIdPipe } from '../../../Pipes/mongo-id/mongo-id.pipe';

// Models
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  getAll() {
    return this.userService.finAll();
  }

  @Get(':id')
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.userService.delete(id);
  }
}
