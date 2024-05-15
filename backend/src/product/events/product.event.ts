import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { PRODUCT_MODULE_NAME } from "../constants";

export abstract class ProductEvent extends PulseBuyEvent {
  protected constructor(id: number) {
    super(id);
  }

  override getAggregateType(): string {
    return PRODUCT_MODULE_NAME;
  }
}

export class ProductCreatedEvent extends ProductEvent {
  constructor(id: number) {
    super(id);
  }
}

export class ProductUpdatedEvent extends ProductEvent {
  constructor(id: number) {
    super(id);
  }
}