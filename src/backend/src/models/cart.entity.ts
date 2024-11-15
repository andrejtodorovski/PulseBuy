import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

import { CartStatus } from './cart-status.enum';

@Entity(
  { name: 'carts' }
)
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User) 
  user: User;

  @Column({
    type: 'enum',
    enum: CartStatus,
    default: CartStatus.IN_CART,
  })
  status: CartStatus;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOrdered: Date;

}
