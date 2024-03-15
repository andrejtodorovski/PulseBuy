import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from 'src/models/cart-item.entity';

import { Product } from 'src/models/product.entity';
import { Cart } from 'src/models/cart.entity';

@Injectable()
export class CartItemService {

  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cart = await this.cartRepository.findOne({
      where: { id: createCartItemDto.cartId },
  });
  if (!cart) {
      throw new NotFoundException(`Cart with id ${createCartItemDto.cartId} not found`);
  }
  const product = await this.productRepository.findOne({
    where: { id: createCartItemDto.productId },
});
if (!product) {
    throw new NotFoundException(`Product with id ${createCartItemDto.productId} not found`);
}
    const cartItem = this.cartItemRepository.create({...createCartItemDto,
      cart: cart,
      product : product
    });
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
  async getCartItemsByCartId(cartId: number): Promise<CartItem[]> {
    const cartItems = await this.cartItemRepository.find({
      where: { cart: { id: cartId } },
      relations: ['product'],
    });
    if (!cartItems) {
      throw new NotFoundException(`Cart with id ${cartId} not found`);
    }
    return cartItems;
  }
}
