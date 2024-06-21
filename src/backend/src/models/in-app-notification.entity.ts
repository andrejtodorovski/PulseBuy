import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NotificationStatus } from "./notification-status.enum";
import { NotificationManager } from "./notification-manager.entity";

@Entity({ name: "in-app-notification" })
export class InAppNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @Column(
    {
      type: "enum",
      enum: NotificationStatus
    })
  status: NotificationStatus;

  @Column()
  body: string;

  @ManyToOne(() => NotificationManager, { eager: true })
  notificationManager: NotificationManager;

  constructor(body: string, notificationManager: NotificationManager) {
    this.body = body;
    this.notificationManager = notificationManager;
    this.status = NotificationStatus.UNREAD;
  }
}
