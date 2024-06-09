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
  name: string;
  percentage: number;
  date_to: Date;
  constructor(id: number, name: string, percentage: number, date_to: Date) {
    super(id);
    this.name = name;
    this.percentage = percentage;
    this.date_to = date_to;
  }
}