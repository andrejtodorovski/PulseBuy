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

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Newsletter, Product, Category])],
  providers: [TasksService, ContactService, NewsletterService, ProductService, ProductEventsService],
  exports: [TasksService]
})
export class TasksModule {

}
