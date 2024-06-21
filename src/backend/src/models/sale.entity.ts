import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity(
    {name: 'sales'}
)
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    percentage: number;

    @CreateDateColumn({
        type: 'date'
    })
    date_from: Date;
    @CreateDateColumn({
        type: 'date'
    })
    date_to: Date;

    @Column()
    isActive: boolean;

}
