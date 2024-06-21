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
import { OrderEventsService } from "./order/order-events.service";
import { OrderCreatedEvent } from "./order/order.event";
import { OrderInfo } from "../models/order-info.entity";
import { OrderInfoRequest } from "./order/order-info.request";

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
    @InjectRepository(OrderInfo)
    private orderInfoRepository: Repository<OrderInfo>,
    private orderEventsService: OrderEventsService
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
    return this.cartRepository.findOne({
      where: {
        user: { id: userId },
        status: CartStatus.IN_CART
      }
    });
  }

  async findByUserOrders(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    }) as unknown as User;
    if (!user) {
      throw new Error("User not found");
    }
    return this.cartRepository.find({
      where: {
        user: user,
        status: CartStatus.DELIVERED
      }
    });
  }

  async findAllOrdered() {
    return this.cartRepository.find({
      where: {
        status: CartStatus.DELIVERED
      }
    });
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }

  async changeStatus(id: number, orderInfo: OrderInfoRequest) {
    const cart = await this.cartRepository.findOne({
      relations: ["user"],
      where: { id }
    });
    let totalPrice = 0;
    const cartItems = await this.cartItemRepository.find({
      relations: ["product"],
      where: { cart: { id } }
    });
    for (const cartItem of cartItems) {
      totalPrice += cartItem.product.price * cartItem.quantity;
      await this.productRepository.update(cartItem.product.id, { numberInStock: cartItem.product.numberInStock - cartItem.quantity });
    }
    const orderCreatedEvent = new OrderCreatedEvent(cart.id, totalPrice, cart.user.id);
    const orderInfoEntity = this.orderInfoRepository.create({
      ...orderInfo,
      cart
    });

    await this.orderInfoRepository.save(
      orderInfoEntity
    );
    await this.create(new CreateCartDto(cart.user.id));
    const cartPromise = this.cartRepository.update(id, {
      status: CartStatus.DELIVERED,
      dateOrdered: new Date()
    });

    cartPromise.then(() => {
      this.orderEventsService.emitEvent(orderCreatedEvent);
    });
    return cartPromise;
  }
}