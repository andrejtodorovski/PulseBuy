import {Module} from '@nestjs/common';
import {DefaultEventNotificationService} from './event-notification/default-event-notification.service';
import {HtmlTemplateModule} from "../html-template/html-template.module";
import {UsersModule} from "../users/users.module";
import {EmailNotificationListener} from "./listeners/email-notification.listener";

@Module({
    imports: [HtmlTemplateModule, UsersModule],
    providers: [DefaultEventNotificationService,
        EmailNotificationListener,
        {
            provide: 'EventNotificationServices',
            useFactory: (defaultEventNotificationService: DefaultEventNotificationService) => [defaultEventNotificationService],
            inject: [DefaultEventNotificationService],
        }],
})
export class NotificationsModule {
}
