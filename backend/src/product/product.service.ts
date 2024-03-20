import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from './entities/product.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { MoreThan } from 'typeorm';
import {Category} from 'src/models/category.entity';
import {Transactional} from 'typeorm-transactional';
import {ProductCreatedEvent} from "./events/product-created.event";
import {ProductEventsService} from "./product-events.service";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private productEventsService: ProductEventsService,
    ) {
    }

    @Transactional()
    async create(createProductDto: CreateProductDto) {
        const category = await this.categoryRepository.findOne({
            where: {id: createProductDto.categoryId},
        });
        if (!category) {
            throw new NotFoundException(
                `Category with id ${createProductDto.categoryId} not found`,
            );
        }
        const product = this.productsRepository.create({
            ...createProductDto,
            category: category,
        });

        const productCreatedEvent = new ProductCreatedEvent(product.id);
        this.productEventsService.emitProductEvent(productCreatedEvent);

        return await this.productsRepository.save(product);
    }

    findAll() {
        return this.productsRepository.find();
    }

    findAllProductsAddedInLast24Hours() {
        const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        return this.productsRepository.find({
            where: {
                createdAt: MoreThan(twentyFourHoursAgo),
            },
        });
    }

    findOne(id: number) {
        return this.productsRepository.findOne({
            where: {id},
            relations: ['category'],
        });
    }

    @Transactional()
    async update(id: number, updateProductDto: UpdateProductDto) {
        const newCategory = await this.categoryRepository.findOne({
            where: {id: updateProductDto.categoryId},
        });
        if (!newCategory) {
            throw new NotFoundException(
                `Category with id ${updateProductDto.categoryId} not found`,
            );
        }
        const product = await this.productsRepository.findOne({
            where: {id},
            relations: ['category'],
        });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        const updatedProduct = this.productsRepository.merge(product, {
            ...updateProductDto,
            category: newCategory,
        });
        return await this.productsRepository.save(updatedProduct);
    }

    remove(id: number) {
        return this.productsRepository.delete(id);
    }
}
