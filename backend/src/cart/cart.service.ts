import { Cart } from "src/models/cart.entity";
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/models/user.entity";
import { Transactional } from "typeorm-transactional";
import { CreateCartDto } from "./dto/create-cart.dto";
import { CartStatus } from "src/models/cart-status.enum";
@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    @Transactional()
    async create(createCartDto: CreateCartDto) {

        const user = await this.userRepository.findOne({
            where: { id: createCartDto.userId },
        });
        if (!user) {
            throw new NotFoundException(`User with id ${createCartDto.userId} not found`);
        }

        const cart = this.cartRepository.create({
            ...createCartDto,
            user: user,

          });
        return await this.cartRepository.save(cart);
    }
    findAll() {
        return this.cartRepository.find();
    }

    findOne(id: number) {
        return this.cartRepository.findOne({
            where: { id },
        });
    }
    findByUser(userId: number) {
        const user = this.userRepository.findOne({
            where: { id: userId },
        }) as unknown as User;
      return this.cartRepository.findOne({
        where: { user ,
        status: CartStatus.IN_CART },
      });
    }
    findByUserOrders(userId: number) {
        const user = this.userRepository.findOne({
            where: { id: userId },
        }) as unknown as User;
      return this.cartRepository.find({
        where: { user ,
        status: CartStatus.DELIVERED },
      });
    }
    remove(id: number) {
        return this.cartRepository.delete(id);
    }
    changeStatus(id: number) {
        return this.cartRepository.update(id, { status: CartStatus.DELIVERED });
      }
}