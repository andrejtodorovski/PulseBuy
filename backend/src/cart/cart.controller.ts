import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {
    }

    @Post()
    create(@Body() CreateCartDto: CreateCartDto) {
        return this.cartService.create(CreateCartDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.cartService.findAll();
    }

    @Get('admin-orders')
    @UseGuards(JwtAuthGuard)
    findAllOrdered() {
        return this.cartService.findAllOrdered();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.cartService.findOne(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.cartService.remove(+id);
    }

    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    findByUser(@Param('id') id: string) {
        return this.cartService.findByUser(+id);
    }

    @Patch('change-status/:id')
    @UseGuards(JwtAuthGuard)
    changeStatus(@Param('id') id: string) {
        return this.cartService.changeStatus(+id);
    }

    @Get('user/ordered/:id')
    @UseGuards(JwtAuthGuard)
    findByUserOrders(@Param('id') id: string) {
        return this.cartService.findByUserOrders(+id);
    }
}
