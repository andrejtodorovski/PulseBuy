import { Inject, Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PULSE_BUY_EVENT } from "../../events/constants";
import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { MailerService } from "@nestjs-modules/mailer";
import { HtmlTemplateContext } from "../../models/html-template-context.enum";
import { EventNotificationService } from "../event-notification/event-notification.service";

@Injectable()
export class EmailNotificationListener {
  private logger = new Logger(EmailNotificationListener.name);

  constructor(
    private readonly mailerService: MailerService,
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
            HtmlTemplateContext.EMAIL_NOTIFICATION
          )
        ) {
          const users =
            await eventNotificationService.notificationRecipients(event);
          users.map(async (user) => {
            const notification =
              await eventNotificationService.buildNotification(
                event,
                HtmlTemplateContext.EMAIL_NOTIFICATION,
                user
              );
            if (!notification) {
              this.logger.error(
                `Error while building the notification for the event: ${event.constructor.name}`
              );
              return;
            }
            await this.mailerService.sendMail({
              to: user.email,
              subject: notification.title,
              html: notification.body
            });
          });
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
