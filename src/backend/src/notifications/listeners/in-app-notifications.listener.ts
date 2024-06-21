import { Inject, Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PULSE_BUY_EVENT } from "../../events/constants";
import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { HtmlTemplateContext } from "../../models/html-template-context.enum";
import { EventNotificationService } from "../event-notification/event-notification.service";
import { NotificationManagerService } from "../notification-manager/notification-manager.service";

@Injectable()
export class InAppNotificationsListener {
  private logger = new Logger(InAppNotificationsListener.name);

  constructor(
    private readonly notificationManagerService: NotificationManagerService,
    @Inject("eventNotificationServices") private readonly eventNotificationServices: EventNotificationService[]
  ) {
  }

  @OnEvent(`${PULSE_BUY_EVENT}.**`, { async: true })
  async handlePulseBuyEvent(event: PulseBuyEvent): Promise<void> {
    try {
      for (const eventNotificationService of this.eventNotificationServices) {
        if (
          await eventNotificationService.applicableTo(
            event,
            HtmlTemplateContext.IN_APP_NOTIFICATION
          )
        ) {
          const users =
            await eventNotificationService.notificationRecipients(event);
          users.map(async (user) => {
            const notification =
              await eventNotificationService.buildNotification(
                event,
                HtmlTemplateContext.IN_APP_NOTIFICATION,
                user
              );
            if (!notification) {
              this.logger.error(
                `Error while building the notification for the event: ${event.constructor.name}`
              );
              return;
            }
            try {
              await this.notificationManagerService.addInAppNotificationForUser(user, notification.body);
            } catch (error) {
              this.logger.error("Error while adding in-app notification", error);
            }
          });
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
