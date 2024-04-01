import {Injectable, Logger} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";
import {PULSE_BUY_EVENT} from "../../events/constants";
import {PulseBuyEvent} from "../../events/events/pulse-buy.event";
import {MailerService} from "@nestjs-modules/mailer";
import {HtmlTemplateContext} from "../../models/html-template-context.enum";
import {DefaultEventNotificationService} from "../event-notification/default-event-notification.service";

@Injectable()
export class EmailNotificationListener {
    constructor(private readonly mailerService: MailerService, private readonly eventNotificationServices: DefaultEventNotificationService) {
    }

    private logger = new Logger(EmailNotificationListener.name);

    @OnEvent(`${PULSE_BUY_EVENT}.**`, {async: true})
    async handlePulseBuyEvent(event: PulseBuyEvent): Promise<void> {
        try {
            const users = await this.eventNotificationServices.notificationRecipients(event);
            users.map(async user => {
                const notification = await this.eventNotificationServices.buildNotification(event, HtmlTemplateContext.EMAIL_NOTIFICATION, user);
                if (!notification) {
                    this.logger.error(`Error while building the notification for the event: ${event.constructor.name}`);
                    return;
                }
                await this.mailerService.sendMail({
                    to: user.email,
                    subject: notification.title,
                    html: notification.body
                });
            });
        } catch (error) {
            this.logger.error(error);
        }
    }
}