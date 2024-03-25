import { Injectable, Logger } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sale } from "../models/sale.entity";
import { SaleCreatedEvent } from "./events/sale-created.event";
import { SaleEventsService } from "./sale-events.service";
import { ProductService } from "../product/product.service";
import { Product } from "../models/product.entity";

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private saleRepository: Repository<Sale>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private saleEventService: SaleEventsService,
    ) {
    }

    private readonly logger = new Logger(SaleService.name);

    async create(createSaleDto: CreateSaleDto) {
        const sale = this.saleRepository.create(createSaleDto);
        const saleCreatedEvent = new SaleCreatedEvent(createSaleDto.productId);
        this.logger.log(`Sale created for product with id ${createSaleDto.productId}. Please notify all the users that have this product as their favorite about the sale.`);
        this.saleEventService.emitSaleEvent(saleCreatedEvent);
        // TODO() - darko - notify all the users that have this product in their wishlist about the sale
        // implement it only using the sockets or create a notifications service, we need to talk about what approach to take
        return this.saleRepository.save(sale);
    }

    findAll() {
        return this.saleRepository.find();
    }

    async findAllByProductId(productId: number) {
        const product = await this.productRepository.findOne(
            {
                where: {id: productId},
            }
        );

        return this.saleRepository.find({
            where: {product}
        });
    }

    remove(id: number) {
        return this.saleRepository.delete(id);
    }
}
