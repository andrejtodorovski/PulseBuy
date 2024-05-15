import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/models/review.entity';
import { UsersService } from "../users/users.service";
import { ProductService } from "../product/product.service";
import { Product } from "../models/product.entity";
import { User } from "../models/user.entity";
import { Category } from "../models/category.entity";
import { ProductEventsService } from "../product/product-events.service";
import { Sale } from "../models/sale.entity";
import { SaleService } from "../sale/sale.service";
import { SaleEventsService } from "../sale/sale-events.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Product, Category, Sale])
  ],
  providers: [ReviewService, UsersService, ProductService, ProductEventsService, SaleService, SaleEventsService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
