import { Injectable } from "@nestjs/common";
import { NotificationManagerService } from "../notification-manager/notification-manager.service";
import { OnEvent } from "@nestjs/event-emitter";
import { PULSE_BUY_EVENT } from "../../events/constants";
import { USERS_MODULE_NAME } from "../../users/constants";
import { UserCreatedEvent } from "../../users/events/users.event";

@Injectable()
export class UserRegisteredListener {
  constructor(private readonly notificationManagerService: NotificationManagerService) {
  }

  @OnEvent(`${PULSE_BUY_EVENT}.${USERS_MODULE_NAME}.UserCreatedEvent`, { async: true })
  async handleUserRegisteredEvent(userCreatedEvent: UserCreatedEvent): Promise<void> {
    await this.notificationManagerService.createNotificationManager(userCreatedEvent.user);
  }
}