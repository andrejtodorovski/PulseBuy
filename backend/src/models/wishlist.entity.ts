import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity(
    {name: 'wishlist'}
)
export class Wishlist {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Product)
    product: Product;

    constructor(user: User, product: Product) {
        this.user = user;
        this.product = product;
    }
}