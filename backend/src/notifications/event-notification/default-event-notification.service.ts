import {Injectable} from '@nestjs/common';
import {HtmlTemplateService} from "../../html-template/html-template.service";
import {UsersService} from "../../users/users.service";
import {EventNotificationService} from "./event-notification.service";

@Injectable()
export class DefaultEventNotificationService extends EventNotificationService {
    constructor(readonly htmlTemplateService: HtmlTemplateService, readonly usersService: UsersService) {
        super(htmlTemplateService, usersService);
    }
}
