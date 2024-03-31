import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wishlist } from "../models/wishlist.entity";
import { Category } from "../models/category.entity";
import { User } from "../models/user.entity";
import { Product } from "../models/product.entity";
import { UsersService } from "../users/users.service";
import { ProductService } from "../product/product.service";
import { ProductEventsService } from "../product/product-events.service";
import { SaleService } from "../sale/sale.service";
import { Sale } from "../models/sale.entity";
import { SaleEventsService } from "../sale/sale-events.service";

@Module({
    imports: [TypeOrmModule.forFeature([Wishlist, User, Product, Category, Sale])],
    controllers: [WishlistController],
    providers: [WishlistService, UsersService, ProductService, ProductEventsService, SaleService, SaleEventsService],
    exports: [WishlistService]
})
export class WishlistModule {
}
