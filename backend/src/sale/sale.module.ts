import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sale } from "../models/sale.entity";
import { ProductService } from "../product/product.service";
import { SaleEventsService } from "./sale-events.service";
import { Product } from "../models/product.entity";
import { Category } from "../models/category.entity";
import { ProductEventsService } from "../product/product-events.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Product, Category])
  ],
  providers: [SaleService, SaleEventsService],
  controllers: [SaleController],
  exports: [SaleService],
})
export class SaleModule {}
