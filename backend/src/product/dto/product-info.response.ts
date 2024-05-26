export class ProductInfoResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    priceAfterDiscount: number;
    categoryName: string;
    imageURL: string;
    createdAt: Date;

    constructor(id: number, name: string, description: string, price: number, priceAfterDiscount: number, categoryName: string, imageURL: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.priceAfterDiscount = priceAfterDiscount;
        this.categoryName = categoryName;
        this.imageURL = imageURL;
        this.createdAt = createdAt;
    }
}