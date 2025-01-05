import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('bearer'))
  findAll(@Request() req) {
    const user = req.user;
    console.log(user);
    return this.usersService.findAll();
  }

  @Get(':token')
  @UseGuards(AuthGuard('bearer'))
  findByToken(@Request() req, @Param('token') token : string) {
    const user = req.user;
    console.log(user)
    return this.usersService.getUserByToken(token)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Put(':id/:productId')
  putToy(@Param('id') id: string,@Param('productId') toyId: string) {
      return this.usersService.addProduct(+id, +toyId);
  }
  @Delete(':id/:productId')
  patchToy(@Param('id') id: string,@Param('productId') toyId: string) {
      return this.usersService.removeProduct(+id, +toyId);
  }
}
