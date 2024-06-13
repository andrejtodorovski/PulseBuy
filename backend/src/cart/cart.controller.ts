import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { OrderInfoRequest } from "./order/order-info.request";
import { CreateCartDto } from "./dto/create-cart.dto";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {
    }

    @Post()
    create(@Body() createCartDto: CreateCartDto) {
        return this.cartService.create(createCartDto);
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
    changeStatus(@Param('id') id: string, @Body() orderInfo: OrderInfoRequest) {
        return this.cartService.changeStatus(+id, orderInfo);
    }

    @Get('user/ordered/:id')
    @UseGuards(JwtAuthGuard)
    findByUserOrders(@Param('id') id: string) {
        return this.cartService.findByUserOrders(+id);
    }
}
