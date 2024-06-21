export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    imageURL: string;
    numberInStock: number;

    constructor() {
        this.name = "";
        this.description = "";
        this.price = 0;
        this.categoryId = 0;
        this.imageURL = "";
        this.numberInStock = 0;
    }
}

export class UpdateProductDto {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    imageURL: string;
    numberInStock: number;

    constructor(product: Product) {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.categoryId = product.category.id;
        this.imageURL = product.imageURL;
        this.numberInStock = product.numberInStock;
    }
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    imageURL: string;
    priceAfterDiscount: number;
    numberInStock: number;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}
