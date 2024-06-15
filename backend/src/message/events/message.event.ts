import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { MESSAGE_MODULE_NAME } from "../constants";

export abstract class MessageEvent extends PulseBuyEvent {
    protected constructor(id: number) {
        super(id);
    }

    override getAggregateType(): string {
        return MESSAGE_MODULE_NAME;
    }
}

export class MessageSentByAdminEvent extends MessageEvent {
    userId: number;

    constructor(id: number, userId: number) {
        super(id);
        this.userId = userId;
    }
}

export class MessageSentByUserEvent extends MessageEvent {
    fullName: string;

    constructor(id: number, fullName: string) {
        super(id);
        this.fullName = fullName;
    }
}