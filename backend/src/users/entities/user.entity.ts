import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../models/order.entity';

@Entity(
  { name: 'users' }
)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

}
