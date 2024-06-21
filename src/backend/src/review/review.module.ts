import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/models/review.entity';
import { UsersModule } from "../users/users.module";
import { ProductModule } from "../product/product.module";
import { SaleModule } from "../sale/sale.module";
import { CategoryModule } from "../category/category.module";

@Module({
    imports: [
        UsersModule,
        ProductModule,
        SaleModule,
        CategoryModule,
        TypeOrmModule.forFeature([Review])
    ],
    providers: [ReviewService],
    controllers: [ReviewController],
    exports: [ReviewService],
})
export class ReviewModule {
}
