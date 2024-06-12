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
import { SaleModule } from "../sale/sale.module";

@Module({
    imports: [SaleModule, TypeOrmModule.forFeature([Product, Category, Sale])],
    providers: [ProductService, ProductEventsService],
    controllers: [ProductController],
    exports: [ProductService],
})
export class ProductModule {
}
