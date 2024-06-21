import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { Cart } from 'src/models/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { CartItem } from 'src/models/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product,CartItem])
  ],
  providers: [CartItemService],
  controllers: [CartItemController],
  exports: [CartItemService],
})
export class CartItemModule {}
