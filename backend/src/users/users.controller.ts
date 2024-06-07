import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Controller, Post, UseGuards, Request, Body, Get, Param } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { log } from 'console';
import { UserResponse } from './dto/user-response';

@Controller('users')
export class UsersController {
    constructor(private authService: AuthService, private usersService: UsersService) {
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

    @Get()
    async getUsers() {
        return this.usersService.findAll();
    }

    @Put(':id/update-permissions')
    async updatePermissions(@Param("id") id: number) {
        return this.usersService.updatePermissions(id);
    }

@UseGuards(JwtAuthGuard)
  @Get('/profile/:userId')
   async profile(@Param('userId') id: string){
    const user =  await this.usersService.findById(+id);
    const userResponse: UserResponse = {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      address: user.address
  }
  return userResponse;
}
}
