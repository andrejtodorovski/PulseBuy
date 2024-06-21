import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MESSAGE_MODULE_NAME } from "./constants";
import { EventService } from "../notifications/event-notification/event.service";

@Injectable()
export class MessageEventsService extends EventService {
    constructor(eventEmitter: EventEmitter2) {
        super(eventEmitter, MESSAGE_MODULE_NAME);
    }
}
