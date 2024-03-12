import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() CreateCartDto: CreateCartDto) {
    return this.cartService.create(CreateCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
  
  @Get('user/:id')
    findByUser(@Param('id') id: string) {
        return this.cartService.findByUser(+id);
    }
    
  @Patch('change-status/:id')
  changeStatus(@Param('id') id: string) {
    return this.cartService.changeStatus(+id);
  }
}
