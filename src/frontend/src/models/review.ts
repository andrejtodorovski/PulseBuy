import type { Product } from "./products";

export class CreateReviewDto {
    rating: number;
    comment: string;
    productId: number;
    userId: number;

    constructor() {
        this.rating = 1;
        this.comment = "";
        this.productId = 0;
        this.userId = 0;
    }
}

export interface Review {
    id: number;
    rating: number;
    comment: string;
    reviewDate: string;
    product: Product;
    user: any;
}
