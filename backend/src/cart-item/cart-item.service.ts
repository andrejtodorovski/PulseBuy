import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from 'src/models/cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find({ relations: ['cart', 'product'] });
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id }, relations: ['cart', 'product']});
    if (!cartItem) {
      throw new NotFoundException(`CartItem #${id} not found`);
    }
    return cartItem;
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    await this.cartItemRepository.update(id, updateCartItemDto);
    const updatedCartItem = await this.findOne(id);
    if (!updatedCartItem) {
      throw new NotFoundException(`CartItem #${id} not found`);
    }
    return updatedCartItem;
  }

  async remove(id: number): Promise<void> {
    const result = await this.cartItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CartItem #${id} not found`);
    }
  }
}
