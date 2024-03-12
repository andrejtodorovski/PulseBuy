import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from './product.entity';

@Entity(
  { name: 'reviews' }
)
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;

  @Column()
  rating: number;

  @Column('text')
  comment: string;

  @CreateDateColumn({
    default: Date.now()
  })
  reviewDate: Date;
}
