import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { InAppNotificationEntity } from "./in-app-notification.entity";

@Entity({ name: "notification_manager" })
export class NotificationManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => InAppNotificationEntity, (inAppNotification) => inAppNotification.notificationManager)
  inAppNotifications: InAppNotificationEntity[];

  static MAX_NOTIFICATIONS_PER_USER = 100;

  constructor(user: User) {
    this.user = user;
  }
}
