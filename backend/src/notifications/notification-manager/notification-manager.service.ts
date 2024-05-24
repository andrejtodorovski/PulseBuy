import { Injectable, NotFoundException } from "@nestjs/common";
import { NotificationManager } from "../../models/notification-manager.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InAppNotification } from "../../models/in-app-notification.entity";
import { User } from "../../models/user.entity";
import { Transactional } from "typeorm-transactional";
import { NotificationStatus } from "../../models/notification-status.enum";
import { NotificationManagerEventsService } from "./notification-manager-events.service";
import {
  AllNotificationsMarkedAsReadForManagerEvent,
  NotificationAddedToManagerEvent,
  NotificationMarkedAsReadEvent
} from "../events/notification-manager.event";

@Injectable()
export class NotificationManagerService {
  constructor(@InjectRepository(NotificationManager) private notificationManagerRepository: Repository<NotificationManager>,
              @InjectRepository(InAppNotification) private inAppNotificationRepository: Repository<InAppNotification>,
              private notificationManagerEventsService: NotificationManagerEventsService) {
  }

  async getNotificationManagerByUserId(userId: number): Promise<NotificationManager> {
    return this.notificationManagerRepository.findOne({ where: { user: { id: userId } } });
  }

  async createNotificationManager(user: User): Promise<NotificationManager> {
    const notificationManager = new NotificationManager(user);

    return this.notificationManagerRepository.save(notificationManager);
  }

  @Transactional()
  async addInAppNotificationForUser(user: User, body: string): Promise<InAppNotification> {
    const notificationManager = await this.getNotificationManagerByUserId(user.id);
    if (!notificationManager) {
      throw new NotFoundException("Notification manager not found");
    }
    const inAppNotification = new InAppNotification(body, notificationManager);

    if (notificationManager.inAppNotifications && notificationManager.inAppNotifications.length >= NotificationManager.MAX_NOTIFICATIONS_PER_USER) {
      const shiftedNotification = notificationManager.inAppNotifications.shift();
      await this.inAppNotificationRepository.remove(shiftedNotification);
    }
    this.notificationManagerEventsService.emitEvent(new NotificationAddedToManagerEvent(user.id, body));
    return this.inAppNotificationRepository.save(inAppNotification);
  }

  async markNotificationAsRead(notificationId: number): Promise<void> {
    const notification = await this.inAppNotificationRepository.findOne({ where: { id: notificationId } });
    if (!notification) {
      throw new NotFoundException("Notification not found");
    }
    notification.status = NotificationStatus.READ;
    this.notificationManagerEventsService.emitEvent(new NotificationMarkedAsReadEvent(notification.notificationManager.user.id));
    await this.inAppNotificationRepository.save(notification);
  }

  async getInAppNotificationsForUser(userId: number): Promise<InAppNotification[]> {
    return this.inAppNotificationRepository.find({
      where: { notificationManager: { user: { id: userId } } },
      order: { createdAt: "DESC" }
    });
  }

  async markAllNotificationsAsRead(userId: number): Promise<void> {

    const notifications = await this.getInAppNotificationsForUser(userId);
    for (const notification of notifications) {
      notification.status = NotificationStatus.READ;
      await this.inAppNotificationRepository.save(notification);
    }

    this.notificationManagerEventsService.emitEvent(new AllNotificationsMarkedAsReadForManagerEvent(userId));
  }
}
