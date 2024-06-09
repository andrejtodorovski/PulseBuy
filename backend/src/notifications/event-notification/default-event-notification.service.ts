import { Injectable } from '@nestjs/common';
import { HtmlTemplateService } from '../../html-template/html-template.service';
import { UsersService } from '../../users/users.service';
import { EventNotificationService } from './event-notification.service';
import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { HtmlTemplateContext } from "../../models/html-template-context.enum";
import { User } from "../../models/user.entity";

@Injectable()
export class DefaultEventNotificationService extends EventNotificationService {
  constructor(
    readonly htmlTemplateService: HtmlTemplateService,
    readonly usersService: UsersService,
  ) {
    super(htmlTemplateService, usersService);
  }

  override async applicableTo(event: PulseBuyEvent, channel: HtmlTemplateContext): Promise<boolean> {
    const eventType = event.getEventType();
    if (eventType === 'Sale.SaleCreatedEvent' || eventType === 'Product.ProductBackInStockEvent') {
      return false;
    } else {
      return this.htmlTemplateService.existsByEventClassNameAndContext(event.constructor.name, channel);
    }
  }

  override async notificationRecipients(event: PulseBuyEvent): Promise<User[]> {
    return await this.usersService.findAllUsers();
  }
}
