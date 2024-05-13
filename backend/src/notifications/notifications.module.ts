import { Module } from "@nestjs/common";
import { HtmlTemplateModule } from "../html-template/html-template.module";
import { UsersModule } from "../users/users.module";
import { EmailNotificationListener } from "./listeners/email-notification.listener";
import { DefaultEventNotificationService } from "./event-notification/default-event-notification.service";
import { NotificationManagerService } from "./notification-manager/notification-manager.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationManagerEntity } from "../models/notification-manager.entity";
import { InAppNotificationEntity } from "../models/in-app-notification.entity";
import { UserRegisteredListener } from "./listeners/user-registered.listener";
import { InAppNotificationsListener } from "./listeners/in-app-notifications.listener";

@Module({
  imports: [HtmlTemplateModule, UsersModule, TypeOrmModule.forFeature([NotificationManagerEntity, InAppNotificationEntity])],
  providers: [EmailNotificationListener, DefaultEventNotificationService, {
    provide: "eventNotificationServices",
    useFactory: (defaultEventNotificationService: DefaultEventNotificationService) => [defaultEventNotificationService],
    inject: [DefaultEventNotificationService]
  }, NotificationManagerService, UserRegisteredListener, InAppNotificationsListener]
})
export class NotificationsModule {
}
