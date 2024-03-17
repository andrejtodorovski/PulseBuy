import {PulseBuyEvent} from "../../events/events/pulse-buy.event";

export abstract class ProductEvent extends PulseBuyEvent {
    protected constructor(id: number) {
        super(id);
    }
}