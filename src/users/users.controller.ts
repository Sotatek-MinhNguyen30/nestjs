import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users') // -> /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage("Create a new User")
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    let newUser = await this.usersService.create(createUserDto, user);

    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt
    }
  }

  @Get()
  @ResponseMessage("Fetch all users with paginate")
  findAll(
    @Query("page") currentPage: string, //const currentPage: string = req.query.page
    @Query("limit") limit: string,
    @Query() qs: string //qs = query string -> page + limit
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  @ResponseMessage("Fetch User by id")
  async findOne(@Param('id') id: string) {
    let foundUser = await this.usersService.findOne(id);
    return foundUser;
  }

  @Patch()
  @ResponseMessage("Update a User")
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    let updatedUser = await this.usersService.update(updateUserDto, user);

    return updatedUser;
  }

  @Delete(':id')
  @ResponseMessage("Delete a User")
  async remove(@Param('id') id: string, @User() user: IUser) {
    let deleteUser = await this.usersService.remove(id, user);
    return deleteUser;
  }
}
