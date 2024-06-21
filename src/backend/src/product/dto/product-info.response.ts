export class ProductInfoResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    priceAfterDiscount: number;
    categoryName: string;
    imageURL: string;
    createdAt: Date;
    numberInStock: number;

    constructor(id: number, name: string, description: string, price: number, priceAfterDiscount: number, categoryName: string, imageURL: string, createdAt: Date, numberInStock: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.priceAfterDiscount = priceAfterDiscount;
        this.categoryName = categoryName;
        this.imageURL = imageURL;
        this.createdAt = createdAt;
        this.numberInStock = numberInStock;
    }
}