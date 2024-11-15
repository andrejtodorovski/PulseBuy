import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { Category } from "src/models/category.entity";
import { Transactional } from "typeorm-transactional";
import { ProductBackInStockEvent, ProductCreatedEvent, ProductUpdatedEvent } from "./events/product.event";
import { ProductEventsService } from "./product-events.service";
import { Product } from "../models/product.entity";
import { ProductInfoResponse } from "./dto/product-info.response";
import { SaleService } from "../sale/sale.service";
import { Sale } from "../models/sale.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private productEventsService: ProductEventsService,
    private saleService: SaleService
  ) {
  }

  @Transactional()
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId }
    });
    if (!category) {
      throw new NotFoundException(
        `Category with id ${createProductDto.categoryId} not found`
      );
    }
    const product = this.productsRepository.create({
      ...createProductDto,
      category: category
    });

    const productCreatedEvent = new ProductCreatedEvent(product.id, product.name);

    const productPromise = this.productsRepository.save(product);

    productPromise.then(() => {
      this.productEventsService.emitEvent(productCreatedEvent);
    });
    return productPromise;
  }

  async findAllByCategoryId(categoryId: number) {
    const products = await this.productsRepository.find({
      where: { category: { id: categoryId } },
      relations: ["category"]
    });

    return this.mapProductToProductInfo(products);
  }

  async findAll(): Promise<ProductInfoResponse[]> {
    const products = await this.productsRepository.find({
        relations: ["category"]
      }
    );
    return this.mapProductToProductInfo(products);
  }

  async findAllSortedForRestocking(): Promise<ProductInfoResponse[]> {
    const products = await this.productsRepository.find({
      relations: ["category"],
      order: {
        numberInStock: "ASC"
      }
    });
    return this.mapProductToProductInfo(products);

  }

  async findFeatured(): Promise<ProductInfoResponse[]> {
    const products = await this.productsRepository.find({
      relations: ["category"],
      order: {
        createdAt: "DESC"
      }
    });
    return this.mapProductToProductInfo(products.slice(0, 4));
  }

  async mapProductToProductInfo(products: Product[]) {
    const productsInfo = products.map(async product => {
      const sale = await this.saleService.findActiveSaleForProduct(product.id);
      return new ProductInfoResponse(
        product.id,
        product.name,
        product.description,
        product.price,
        this.getPriceWithDiscountApplied(product.price, sale),
        product.category.name,
        product.imageURL,
        product.createdAt,
        product.numberInStock
      );
    });
    return Promise.all(productsInfo);
  }

  private getPriceWithDiscountApplied(price: number, sale: Sale): number {
    if (!sale) return price;
    let priceWithDiscountApplied = price;
    priceWithDiscountApplied *= (1 - sale.percentage / 100);
    return priceWithDiscountApplied;
  }

  findAllProductsAddedInLast24Hours() {
    const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    return this.productsRepository.find({
      where: {
        createdAt: MoreThan(twentyFourHoursAgo)
      }
    });
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ["category"]
    });
  }

  @Transactional()
  async update(id: number, updateProductDto: UpdateProductDto) {
    const newCategory = await this.categoryRepository.findOne({
      where: { id: updateProductDto.categoryId }
    });
    if (!newCategory) {
      throw new NotFoundException(
        `Category with id ${updateProductDto.categoryId} not found`
      );
    }
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["category"]
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const updatedProduct = this.productsRepository.merge(product, {
      ...updateProductDto,
      category: newCategory
    });

    const productUpdatedEvent = new ProductUpdatedEvent(product.id);

    const productPromise = this.productsRepository.save(updatedProduct);

    productPromise.then(() => {
      this.productEventsService.emitEvent(productUpdatedEvent);
    });
    return productPromise;
  }

  async updateStock(id: number, addAmount: number) {
    const product = await this.productsRepository.findOne(
      { where: { id } }
    );
    const productBackInStockEvent = new ProductBackInStockEvent(id, product.name);
    const productPromise = this.productsRepository.update(id, {
      numberInStock: product.numberInStock + addAmount
    });
    productPromise.then(() => {
      this.productEventsService.emitEvent(productBackInStockEvent);
    });
    return productPromise;
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
