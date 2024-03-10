import { User } from "src/users/entities/user.entity";

export class CreateOrderDto {
    userId: number;
  
    orderDate: Date;
  
    shippingAddress: string;
  
    totalAmount: number;
  
    status: string;

  }
  