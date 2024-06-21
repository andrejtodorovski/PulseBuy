import { Injectable } from "@nestjs/common";
import { EventNotificationService } from "./event-notification.service";
import { HtmlTemplateService } from "../../html-template/html-template.service";
import { UsersService } from "../../users/users.service";
import { PulseBuyEvent } from "../../events/events/pulse-buy.event";
import { User } from "../../models/user.entity";
import { HtmlTemplateContext } from "../../models/html-template-context.enum";
import { WishlistService } from "../../wishlist/wishlist.service";

@Injectable()
export class WishlistEventNotificationService extends EventNotificationService {
    constructor(
        readonly htmlTemplateService: HtmlTemplateService,
        readonly usersService: UsersService,
        readonly wishlistService: WishlistService
    ) {
        super(htmlTemplateService, usersService);
    }

    override async notificationRecipients(event: PulseBuyEvent): Promise<User[]> {
        return await this.wishlistService.findAllUsersWithTheProductInTheirWishlist(
            event.id
        );
    }

    override async applicableTo(event: PulseBuyEvent, channel: HtmlTemplateContext): Promise<boolean> {
        const eventType = event.getEventType();
        if (eventType === 'Sale.SaleCreatedEvent' || eventType === 'Product.ProductBackInStockEvent') {
            return this.htmlTemplateService.existsByEventClassNameAndContext(event.constructor.name, channel);
        } else {
            return false;
        }
    }

}
