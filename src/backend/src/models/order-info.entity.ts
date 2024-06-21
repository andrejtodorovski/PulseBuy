import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from "./cart.entity";
import { User } from "./user.entity";

@Entity(
    {name: 'order_info'}
)
export class OrderInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart;

    @Column()
    streetAddress: string;
    @Column()
    city: string;
    @Column()
    postalCode: string;
    @Column()
    country: string;
    @Column()
    phoneNumber: string;
}
