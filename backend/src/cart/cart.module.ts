import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/models/cart.entity';
import { Product } from 'src/models/product.entity';
import { User } from 'src/models/user.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from "../models/cart-item.entity";
import { OrderEventsService } from "./order/order-events.service";
import { OrderInfo } from "../models/order-info.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product, CartItem, OrderInfo])],
  providers: [CartService, OrderEventsService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
