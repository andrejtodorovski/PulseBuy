import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Transactional } from 'typeorm-transactional';
import { Order } from 'src/models/order.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

 @Transactional()
  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOne({
      where: { id: createOrderDto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${createOrderDto.userId} not found`);
    }
    const order = this.orderRepository.create({
        ...createOrderDto,
        user: user,
      });
    return await this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
    });
  }
  updateStatus(id: number, status: string) {
    return this.orderRepository.update(id, { status });
  }
  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}