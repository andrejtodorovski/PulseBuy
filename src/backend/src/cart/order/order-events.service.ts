import { Injectable } from "@nestjs/common";
import { EventService } from "../../notifications/event-notification/event.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ORDER } from "./constants";

@Injectable()
export class OrderEventsService extends EventService {
    constructor(eventEmitter: EventEmitter2) {
        super(eventEmitter, ORDER);
    }
}