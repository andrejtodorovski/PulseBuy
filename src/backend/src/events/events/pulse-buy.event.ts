export abstract class PulseBuyEvent {
    id: number;
    eventType: string;

    protected constructor(id: number) {
        this.id = id;
        this.eventType = this.constructor.name;
    }

    abstract getAggregateType(): string;

    getEventType(): string {
        return `${this.getAggregateType()}.${this.eventType}`;
    }
}