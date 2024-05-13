import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { User } from "../../models/user.entity";
import { USERS_MODULE_NAME } from "../constants";

export abstract class UsersEvent extends PulseBuyEvent {
  protected constructor(id: number) {
    super(id);
  }

  override getAggregateType(): string {
    return USERS_MODULE_NAME;
  }
}

export class UserCreatedEvent extends UsersEvent {
  user: User;

  constructor(id: number, user: User) {
    super(id);
    this.user = user;
  }
}