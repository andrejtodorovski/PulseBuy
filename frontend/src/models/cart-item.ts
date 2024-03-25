export class CreateCartItemDto {
    cartId: number;
    productId: number;
    quantity: number;

    constructor(cartId: number = 0, productId: number = 0, quantity: number = 1) {
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
    }
    
}

export class UpdateCartItemDto {
    quantity: number;

    constructor() {
        this.quantity = 0;
    }

}
export interface CartItem {
    id: number;
    cartId: number;
    product: Product;
    quantity: number;

}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageURL: string;
    createdAt: Date;
}