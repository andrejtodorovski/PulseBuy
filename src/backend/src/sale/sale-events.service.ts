import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SALE_MODULE_NAME } from "./constants";
import { EventService } from "../notifications/event-notification/event.service";

@Injectable()
export class SaleEventsService extends EventService {
  constructor(eventEmitter: EventEmitter2) {
    super(eventEmitter, SALE_MODULE_NAME);
  }
}
