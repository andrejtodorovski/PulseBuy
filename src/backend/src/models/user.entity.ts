import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(
  { name: "users" }
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

}
