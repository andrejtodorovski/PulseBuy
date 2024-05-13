import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProductEvent } from "../product/events/product.event";
import { PULSE_BUY_EVENT } from "../events/constants";
import { USERS_MODULE_NAME } from "./constants";

@Injectable()
export class UserEventsService {
  constructor(private eventEmitter: EventEmitter2) {
  }

  emitUsersEvent(event: ProductEvent) {
    this.eventEmitter.emit(`${PULSE_BUY_EVENT}.${USERS_MODULE_NAME}.${event.eventType}`, event);
  }
}
