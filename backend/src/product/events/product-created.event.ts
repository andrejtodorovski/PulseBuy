import {ProductEvent} from "./product.event";

export class ProductCreatedEvent extends ProductEvent {
    constructor(id: number) {
        super(id);
    }
}