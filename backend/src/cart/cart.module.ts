import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/models/cart.entity';
import { Product } from 'src/models/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
