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

export class CreateOrderInfo {
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;

    constructor(streetAddress: string = "", city: string = "", postalCode: string = "", country: string = "", phoneNumber: string = "") {
        this.streetAddress = streetAddress;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.phoneNumber = phoneNumber;
    }
}