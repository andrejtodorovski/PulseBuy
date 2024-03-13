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
export interface CartItem {
    id: number;
    cartId: number;
    prodictId: number;
    quantity: number;

}