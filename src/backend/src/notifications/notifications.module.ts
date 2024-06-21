import { Module } from "@nestjs/common";
import { HtmlTemplateModule } from "../html-template/html-template.module";
import { UsersModule } from "../users/users.module";
import { EmailNotificationListener } from "./listeners/email-notification.listener";
import { AllUsersEventNotificationService } from "./event-notification/all-users-event-notification.service";
import { NotificationManagerService } from "./notification-manager/notification-manager.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationManager } from "../models/notification-manager.entity";
import { InAppNotification } from "../models/in-app-notification.entity";
import { UserRegisteredListener } from "./listeners/user-registered.listener";
import { InAppNotificationsListener } from "./listeners/in-app-notifications.listener";
import { NotificationManagerEventsService } from "./notification-manager/notification-manager-events.service";
import { NotificationManagerController } from "./notification-manager/notification-manager.controller";
import { WishlistEventNotificationService } from "./event-notification/wishlist-event-notification-service";
import { WishlistModule } from "../wishlist/wishlist.module";
import { OneUserEventNotificationService } from "./event-notification/one-user-event-notification.service";
import { AllAdminsEventNotificationService } from "./event-notification/all-admins-event-notification.service";

@Module({
    imports: [HtmlTemplateModule, UsersModule, WishlistModule, TypeOrmModule.forFeature([NotificationManager, InAppNotification])],
    providers: [EmailNotificationListener, OneUserEventNotificationService, WishlistEventNotificationService, AllAdminsEventNotificationService, AllUsersEventNotificationService, {
        provide: 'eventNotificationServices',
        useFactory: (
            oneUserEventNotificationService: OneUserEventNotificationService,
            wishlistEventNotificationService: WishlistEventNotificationService,
            allAdminsEventNotificationService: AllAdminsEventNotificationService,
            allUsersEventNotificationService: AllUsersEventNotificationService,
        ) => [oneUserEventNotificationService, wishlistEventNotificationService, allAdminsEventNotificationService, allUsersEventNotificationService],
        inject: [OneUserEventNotificationService, WishlistEventNotificationService, AllAdminsEventNotificationService, AllUsersEventNotificationService],
    }, NotificationManagerService, UserRegisteredListener, InAppNotificationsListener, NotificationManagerEventsService],
    controllers: [NotificationManagerController]
})
export class NotificationsModule {
}
