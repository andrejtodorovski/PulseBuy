export abstract class PulseBuyEvent {
    id: number;
    eventType: string;

    protected constructor(id: number) {
        this.id = id;
        this.eventType = this.constructor.name;
    }
}