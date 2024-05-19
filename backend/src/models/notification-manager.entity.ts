import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { InAppNotification } from "./in-app-notification.entity";

@Entity({ name: "notification_manager" })
export class NotificationManager {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => InAppNotification, (inAppNotification) => inAppNotification.notificationManager)
  inAppNotifications: InAppNotification[];

  static MAX_NOTIFICATIONS_PER_USER = 100;

  constructor(user: User) {
    this.user = user;
  }
}
