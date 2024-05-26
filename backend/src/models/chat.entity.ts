import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(
    { name: 'chats' }
)
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cookie: string;
}
