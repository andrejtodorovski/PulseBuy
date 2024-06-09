import { Cart } from "src/models/cart.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/models/user.entity";
import { Transactional } from "typeorm-transactional";
import { CreateCartDto } from "./dto/create-cart.dto";
import { CartStatus } from "src/models/cart-status.enum";
import { CartItem } from "../models/cart-item.entity";
import { Product } from "../models/product.entity";

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
  }

  @Transactional()
  async create(createCartDto: CreateCartDto) {

    const user = await this.userRepository.findOne({
      where: { id: createCartDto.userId }
    });
    if (!user) {
      throw new NotFoundException(`User with id ${createCartDto.userId} not found`);
    }

    const cart = this.cartRepository.create({
      ...createCartDto,
      user: user

    });

    return await this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOne({
      where: { id }
    });
  }

  findByUser(userId: number) {
    const user = this.userRepository.findOne({
      where: { id: userId }
    }) as unknown as User;
    return this.cartRepository.findOne({
      where: {
        user,
        status: CartStatus.IN_CART
      }
    });
  }

  async findByUserOrders(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    }) as unknown as User;
      if (!user) {
          throw new Error('User not found');
      }
    return this.cartRepository.find({
      where: {
        user: user,
        status: CartStatus.DELIVERED
      }
    });
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }

  async changeStatus(id: number) {
    const cartItems = await this.cartItemRepository.find({
      relations: ['product'],
      where: {cart: {id}}
    });
    for (const cartItem of cartItems) {
      await this.productRepository.update(cartItem.product.id, {numberInStock: cartItem.product.numberInStock - cartItem.quantity});
    }
    return await this.cartRepository.update(id, {status: CartStatus.DELIVERED});
  }
}