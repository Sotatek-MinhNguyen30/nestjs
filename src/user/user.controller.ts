import { Controller, Delete, Get } from '@nestjs/common';

@Controller('user') // user is a router -> localhost:3000/user
export class UserController {

  @Get() // method GET -> empty == "/" -> /user/
  findAll(): string {
    return 'This action returns all users';
  }

  @Get("/by-id") // method GET -> /by-id -> /user/by-id
  // @Delete("/by-id")
  findById(): string {
    return 'This action will delete a user by id';
  }

}

