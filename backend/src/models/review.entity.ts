import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
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
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  reviewDate: Date;

    constructor(product: Product, user: User, rating: number, comment: string) {
        this.product = product;
        this.user = user;
        this.rating = rating;
        this.comment = comment;
    }
}
