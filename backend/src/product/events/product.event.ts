import {PulseBuyEvent} from "../../events/events/pulse-buy.event";

export abstract class ProductEvent extends PulseBuyEvent {
    protected constructor(id: number) {
        super(id);
    }

    override getAggregateType(): string {
        return 'Product';
    }
}

export class ProductCreatedEvent extends ProductEvent {
    constructor(id: number) {
        super(id);
    }
}

export class ProductUpdatedEvent extends ProductEvent {
    constructor(id: number) {
        super(id);
    }
}