import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { SALE_MODULE_NAME } from "../constants";

export abstract class SaleEvent extends PulseBuyEvent {
  protected constructor(id: number) {
    super(id);
  }

  override getAggregateType(): string {
    return SALE_MODULE_NAME;
  }
}

export class SaleCreatedEvent extends SaleEvent {
  constructor(id: number) {
    super(id);
  }
}