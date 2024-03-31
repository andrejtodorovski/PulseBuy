import { PulseBuyEvent } from "../../events/events/pulse-buy.event";

export abstract class SaleEvent extends PulseBuyEvent {
    protected constructor(id: number) {
        super(id);
    }

    override getAggregateType(): string {
        return 'Sale';
    }
}

export class SaleCreatedEvent extends SaleEvent {
    constructor(id: number) {
        super(id);
    }
}