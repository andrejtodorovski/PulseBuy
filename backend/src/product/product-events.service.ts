import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PRODUCT_MODULE_NAME } from "./constants";
import { EventService } from "../notifications/event-notification/event.service";

@Injectable()
export class ProductEventsService extends EventService {
  constructor(eventEmitter: EventEmitter2) {
    super(eventEmitter, PRODUCT_MODULE_NAME);
  }
}
