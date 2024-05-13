import { Injectable, NotFoundException } from "@nestjs/common";
import { NotificationManagerEntity } from "../../models/notification-manager.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InAppNotificationEntity } from "../../models/in-app-notification.entity";
import { User } from "../../models/user.entity";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class NotificationManagerService {
  constructor(@InjectRepository(NotificationManagerEntity) private notificationManagerRepository: Repository<NotificationManagerEntity>,
              @InjectRepository(InAppNotificationEntity) private inAppNotificationRepository: Repository<InAppNotificationEntity>) {
  }

  async getNotificationManagerByUserId(userId: number): Promise<NotificationManagerEntity> {
    return this.notificationManagerRepository.findOne({ where: { user: { id: userId } } });
  }

  async createNotificationManager(user: User): Promise<NotificationManagerEntity> {
    const notificationManager = new NotificationManagerEntity(user);

    return this.notificationManagerRepository.save(notificationManager);
  }

  @Transactional()
  async addInAppNotificationForUser(user: User, body: string): Promise<InAppNotificationEntity> {
    const notificationManager = await this.getNotificationManagerByUserId(user.id);
    if (!notificationManager) {
      throw new NotFoundException("Notification manager not found");
    }
    const inAppNotification = new InAppNotificationEntity(body, notificationManager);

    if (notificationManager.inAppNotifications.length >= NotificationManagerEntity.MAX_NOTIFICATIONS_PER_USER) {
      const shiftedNotification = notificationManager.inAppNotifications.shift();
      await this.inAppNotificationRepository.remove(shiftedNotification);
    }

    return this.inAppNotificationRepository.save(inAppNotification);
  }
}
