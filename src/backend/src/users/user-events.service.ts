import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { USERS_MODULE_NAME } from "./constants";
import { EventService } from "src/notifications/event-notification/event.service";

@Injectable()
export class UserEventsService extends EventService {
  constructor(eventEmitter: EventEmitter2) {
    super(eventEmitter, USERS_MODULE_NAME);
  }
}
