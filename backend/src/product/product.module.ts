import {Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {ProductController} from './product.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {Category} from 'src/models/category.entity';
import {ProductEventsService} from './product-events.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    providers: [ProductService, ProductEventsService],
    controllers: [ProductController],
    exports: [ProductService],
})
@Module({
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {
}
