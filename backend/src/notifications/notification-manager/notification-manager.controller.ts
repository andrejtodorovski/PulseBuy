import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { NotificationManagerService } from "./notification-manager.service";
import { JwtAuthGuard } from "../../auth/jwt.auth.guard";

@Controller("notification-manager")
export class NotificationManagerController {
  constructor(private readonly NotificationManagerService: NotificationManagerService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getNotificationsForUser(@Param("id") id: string) {
    return this.NotificationManagerService.getInAppNotificationsForUser(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("mark-as-read/:notificationId")
  markNotificationAsRead(@Param("notificationId") notificationId: string) {
    return this.NotificationManagerService.markNotificationAsRead(+notificationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("mark-all-as-read/:userId")
  markAllNotificationsAsRead(@Param("userId") userId: string) {
    return this.NotificationManagerService.markAllNotificationsAsRead(+userId);
  }

}
