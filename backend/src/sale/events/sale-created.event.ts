import { SaleEvent } from "./sale.event";

export class SaleCreatedEvent extends SaleEvent {
    constructor(id: number) {
        super(id);
    }
}