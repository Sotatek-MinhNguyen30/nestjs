import { Controller, Post, UseGuards, Get, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';


@Controller("auth") // route/
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Public()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("User Login")
  @Post('/login')
  handleLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage("Get user information")
  @Get('/account')
  handleGetAccount(@User() user: IUser) {
    return { user };
  }

}
