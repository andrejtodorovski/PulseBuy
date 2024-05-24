import { Injectable } from "@nestjs/common";
import { EventService } from "../event-notification/event.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { NOTIFICATION_MANAGER_MODULE_NAME } from "../constants";

@Injectable()
export class NotificationManagerEventsService extends EventService {
  constructor(eventEmitter: EventEmitter2) {
    super(eventEmitter, NOTIFICATION_MANAGER_MODULE_NAME);
  }
}
