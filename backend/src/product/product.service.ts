import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { Category } from 'src/models/category.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @Transactional()
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
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
    return await this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  @Transactional()
  async update(id: number, updateProductDto: UpdateProductDto) {
    const newCategory = await this.categoryRepository.findOne({
      where: { id: updateProductDto.categoryId },
    });
    if (!newCategory) {
      throw new NotFoundException(
        `Category with id ${updateProductDto.categoryId} not found`,
      );
    }
    const product = await this.productsRepository.findOne({
      where: { id },
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
