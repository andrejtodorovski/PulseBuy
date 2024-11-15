import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(
  { name: 'categories' }
)
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  imageUrl: string;
}
