import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProductEvent } from "../product/events/product.event";
import { PULSE_BUY_EVENT } from "../events/constants";
import { SALE_MODULE_NAME } from "../product/constants";
import { SaleEvent } from "./events/sale.event";

@Injectable()
export class SaleEventsService {
    constructor(private eventEmitter: EventEmitter2) {
    }

    emitSaleEvent(event: SaleEvent) {
        this.eventEmitter.emit(`${PULSE_BUY_EVENT}.${SALE_MODULE_NAME}.${event.eventType}`, event);
    }
}
