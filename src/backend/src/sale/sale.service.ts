import { Injectable, Logger, NotAcceptableException } from "@nestjs/common";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sale } from "../models/sale.entity";
import { SaleCreatedEvent } from "./events/sale.event";
import { SaleEventsService } from "./sale-events.service";
import { Product } from "../models/product.entity";

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private saleEventService: SaleEventsService
  ) {
  }

  private readonly logger = new Logger(SaleService.name);

  async create(createSaleDto: CreateSaleDto) {
    if (createSaleDto.percentage < 0 || createSaleDto.percentage > 100) {
      throw new NotAcceptableException("Invalid percentage value. It should be between 0 and 100.");
    }
    const dateFrom = new Date(createSaleDto.date_from);
    const today = new Date();
    const dateTo = new Date(createSaleDto.date_to);
    if (dateFrom > dateTo) {
      throw new NotAcceptableException("Invalid date range. The start date should be before the end date.");
    }
    if (dateFrom < today) {
      throw new NotAcceptableException("Invalid date range. The start date should be in the future.");
    }
    const product = await this.productRepository.findOne(
      {
        where: { id: createSaleDto.productId }
      }
    );
    if (!product) {
      throw new NotAcceptableException("Invalid product id. The product with the provided id does not exist.");
    }
    const existingActiveSaleForTheSameProduct = await this.saleRepository.findOne(
      {
        where: {
          product: { id: createSaleDto.productId },
          isActive: true
        }
      }
    );
    if (existingActiveSaleForTheSameProduct) {
      throw new NotAcceptableException("There is already an active sale for this product.");
    }

    const sale = this.saleRepository.create(
      {
        product,
        percentage: createSaleDto.percentage,
        date_from: createSaleDto.date_from,
        date_to: createSaleDto.date_to,
        isActive: true
      }
    );
    const saleCreatedEvent = new SaleCreatedEvent(createSaleDto.productId, product.name, createSaleDto.percentage, createSaleDto.date_to);
    this.logger.log(`Sale created for product with id ${createSaleDto.productId}. Please notify all the users that have this product as their favorite about the sale.`);
    const salePromise = this.saleRepository.save(sale);
    salePromise.then(() => {
      this.saleEventService.emitEvent(saleCreatedEvent);
    });
    return salePromise;
  }

  findAll() {
    return this.saleRepository.find({
      relations: ["product"]
    });
  }

  findAllDateToInThePastAndActive() {
    return this.saleRepository.find({
      relations: ["product"],
      where: {
        date_to: new Date(),
        isActive: true
      }
    });
  }

  setStatusToInactive(sales: Sale[]) {
    for (const sale of sales) {
      sale.isActive = false;
    }
    return this.saleRepository.save(sales);
  }

  async findAllActive() {
    return await this.saleRepository.find({
      relations: ["product"],
      where: {
        isActive: true
      }
    });
  }

  async findAllInactive() {
    return await this.saleRepository.find({
      relations: ["product"],
      where: {
        isActive: false
      }
    });
  }

  async findActiveSaleForProduct(productId: number) {
    return this.saleRepository.findOne({
      where: {
        product: { id: productId },
        isActive: true
      }
    });
  }

  remove(id: number) {
    return this.saleRepository.delete(id);
  }
}
