import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NotificationStatus } from "./notification-status.enum";
import { NotificationManagerEntity } from "./notification-manager.entity";

@Entity({ name: "in-app-notification" })
export class InAppNotificationEntity {
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

  @ManyToOne(() => NotificationManagerEntity)
  notificationManager: NotificationManagerEntity;

  constructor(body: string, notificationManager: NotificationManagerEntity) {
    this.body = body;
    this.notificationManager = notificationManager;
    this.status = NotificationStatus.UNREAD;
  }
}
