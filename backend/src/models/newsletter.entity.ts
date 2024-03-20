import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'newsletter' })
export class Newsletter {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
}
