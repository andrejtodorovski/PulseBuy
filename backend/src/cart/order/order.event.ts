import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { ORDER } from "./constants";

export abstract class OrderEvent extends PulseBuyEvent {
    protected constructor(id: number) {
        super(id);
    }

    override getAggregateType(): string {
        return ORDER;
    }
}

export class OrderCreatedEvent extends OrderEvent {
    totalPrice: number;
    userId: number;

    constructor(id: number, totalPrice: number, userId: number) {
        super(id);
        this.totalPrice = totalPrice;
        this.userId = userId;
    }
}