import { Module } from "@nestjs/common";
import { HtmlTemplateModule } from "../html-template/html-template.module";
import { UsersModule } from "../users/users.module";
import { EmailNotificationListener } from "./listeners/email-notification.listener";
import { DefaultEventNotificationService } from "./event-notification/default-event-notification.service";

@Module({
  imports: [HtmlTemplateModule, UsersModule],
  providers: [EmailNotificationListener, DefaultEventNotificationService, {
    provide: "eventNotificationServices",
    useFactory: (defaultEventNotificationService: DefaultEventNotificationService) => [defaultEventNotificationService],
    inject: [DefaultEventNotificationService]
  }]
})
export class NotificationsModule {
}
