import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/models/category.entity';
import { ProductEventsService } from './product-events.service';
import { Product } from "../models/product.entity";
import { SaleService } from "../sale/sale.service";
import { Sale } from "../models/sale.entity";
import { SaleEventsService } from "../sale/sale-events.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, Sale])],
    providers: [ProductService, ProductEventsService, SaleService, SaleEventsService],
    controllers: [ProductController],
    exports: [ProductService],
})
@Module({
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {
}
