import { PulseBuyEvent } from "../../events/events/pulse-buy.event";

export abstract class SaleEvent extends PulseBuyEvent {
    protected constructor(id: number) {
        super(id);
    }
}