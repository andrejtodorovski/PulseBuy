import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';

import { CartStatus } from './cart-status.enum';

@Entity(
  { name: 'carts' }
)
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn() 
  user: User;

  @Column({
    type: 'enum',
    enum: CartStatus,
    default: CartStatus.IN_CART,
  })
  status: CartStatus;

}
