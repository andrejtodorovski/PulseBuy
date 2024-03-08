import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/models/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
