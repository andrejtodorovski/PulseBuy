export class CreateWishlistDto {
    userId: number;
    productId: number;
    constructor(userId: number, productId: number) {
        this.userId = userId;
        this.productId = productId;
    }
}