import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ContactService } from 'src/contact/contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/models/contact.entity';
import { Newsletter } from 'src/models/newsletter.entity';
import { NewsletterService } from 'src/newsletter/newsletter.service';
import { Product } from 'src/models/product.entity';
import { ProductService } from 'src/product/product.service';
import { Category } from 'src/models/category.entity';
import { ProductEventsService } from 'src/product/product-events.service';
import { SaleService } from "../sale/sale.service";
import { SaleEventsService } from "../sale/sale-events.service";
import { Sale } from "../models/sale.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Newsletter, Product, Category, Sale])],
  providers: [TasksService, ContactService, NewsletterService, ProductService, ProductEventsService, SaleService, SaleEventsService],
  exports: [TasksService]
})
export class TasksModule {

}
