import {Injectable} from '@nestjs/common';
import {EventEmitter2} from "@nestjs/event-emitter";
import {ProductEvent} from "./events/product.event";
import {PULSE_BUY_EVENT} from "../events/constants";
import {PRODUCT_MODULE_NAME} from "./constants";

@Injectable()
export class ProductEventsService {
    constructor(private eventEmitter: EventEmitter2) {
    }

    emitProductEvent(event: ProductEvent) {
        this.eventEmitter.emit(`${PULSE_BUY_EVENT}.${PRODUCT_MODULE_NAME}.${event.eventType}`, event);
    }
}
