export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    imageURL: string;

    constructor() {
        this.name = "";
        this.description = "";
        this.price = 0;
        this.quantity = 0;
        this.categoryId = 0;
        this.imageURL = "";
    }
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    imageURL: string;
}