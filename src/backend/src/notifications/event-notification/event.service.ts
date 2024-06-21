import { EventEmitter2 } from "@nestjs/event-emitter";
import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { PULSE_BUY_EVENT } from "../../events/constants";

export abstract class EventService {
  private readonly moduleName: string;

  protected constructor(private eventEmitter: EventEmitter2, moduleName: string) {
    this.moduleName = moduleName;
  }

  emitEvent(event: PulseBuyEvent) {
    this.eventEmitter.emit(`${PULSE_BUY_EVENT}.${this.moduleName}.${event.eventType}`, event);
  }
}