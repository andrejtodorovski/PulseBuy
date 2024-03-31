import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
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
  @Get('user/ordered/:id')
  findByUserOrders(@Param('id') id: string) {
      return this.cartService.findByUserOrders(+id);
  }
}
