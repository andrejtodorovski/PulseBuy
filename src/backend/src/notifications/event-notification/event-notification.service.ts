import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { HtmlTemplateService } from "../../html-template/html-template.service";
import { HtmlTemplateContext } from "../../models/html-template-context.enum";
import { User } from "../../models/user.entity";
import { UsersService } from "../../users/users.service";
import * as HandleBars from "handlebars";
import { EventNotification } from "../notifications.model";

export abstract class EventNotificationService {
  protected constructor(readonly htmlTemplateService: HtmlTemplateService, readonly usersService: UsersService) {
  }

  abstract applicableTo(event: PulseBuyEvent, channel: HtmlTemplateContext): Promise<boolean>;

  abstract notificationRecipients(event: PulseBuyEvent): Promise<User[]>;

  async buildNotification(event: PulseBuyEvent, channel: HtmlTemplateContext, user: User): Promise<EventNotification> {
    const template = await this.htmlTemplateService.findByEventClassNameAndContext(event.constructor.name, channel);
    if (!template) {
      return null;
    }
    const body = HandleBars.compile(template.body)({ user: user, event: event });
    return new EventNotification(template.subject, body);
  }
}
