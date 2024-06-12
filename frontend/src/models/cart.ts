import type { CartItem } from "./cart-item";

export class CreateCartDto {
userId: number;

    constructor() {
        this.userId = 0;
    }
}

export interface Cart {
    id: number;
    status: string;
}

export interface CartWithCartItems {
    id: number;
    status: string;
    cartItems: CartItem[];
}
