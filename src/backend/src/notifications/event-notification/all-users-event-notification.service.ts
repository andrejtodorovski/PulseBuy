import { Injectable } from '@nestjs/common';
import { HtmlTemplateService } from '../../html-template/html-template.service';
import { UsersService } from '../../users/users.service';
import { EventNotificationService } from './event-notification.service';
import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { HtmlTemplateContext } from "../../models/html-template-context.enum";
import { User } from "../../models/user.entity";

@Injectable()
export class AllUsersEventNotificationService extends EventNotificationService {
    constructor(
        readonly htmlTemplateService: HtmlTemplateService,
        readonly usersService: UsersService,
    ) {
        super(htmlTemplateService, usersService);
    }

    override async applicableTo(event: PulseBuyEvent, channel: HtmlTemplateContext): Promise<boolean> {
        const eventType = event.getEventType();
        if (eventType === 'Product.ProductCreatedEvent' || eventType === 'Product.ProductUpdatedEvent') {
            return this.htmlTemplateService.existsByEventClassNameAndContext(event.constructor.name, channel);
        } else {
            return false;
        }
    }

    override async notificationRecipients(event: PulseBuyEvent): Promise<User[]> {
        return await this.usersService.findAllUsers();
    }
}
