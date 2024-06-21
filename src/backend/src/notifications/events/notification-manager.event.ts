import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { NOTIFICATION_MANAGER_MODULE_NAME } from "../constants";

export abstract class NotificationManagerEvent extends PulseBuyEvent {
  protected constructor(id: number) {
    super(id);
  }

  override getAggregateType(): string {
    return NOTIFICATION_MANAGER_MODULE_NAME;
  }
}

export class NotificationAddedToManagerEvent extends NotificationManagerEvent {
  message: string;

  constructor(id: number, message: string) {
    super(id);
    this.message = message;
  }
}

export class NotificationMarkedAsReadEvent extends NotificationManagerEvent {
  constructor(id: number) {
    super(id);
  }
}

export class AllNotificationsMarkedAsReadForManagerEvent extends NotificationManagerEvent {
  constructor(id: number) {
    super(id);
  }
}