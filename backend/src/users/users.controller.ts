import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

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
}
