export class CreateCartItemDto {
    cartId: number;
    productId: number;
    quantity: number;

    constructor() {
        this.cartId = 0;
        this.productId = 0;
        this.quantity = 0;
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