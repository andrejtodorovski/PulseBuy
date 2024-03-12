import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from './product.entity';
import { CartItem } from './cart-item.entity';
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

  @Column()
  quantity: number;
}
