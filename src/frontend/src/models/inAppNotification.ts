export enum InAppNotificationStatus {
  UNREAD = "UNREAD",
  READ = "READ",

}

export interface InAppNotification {
  id: number;
  createdAt: Date;
  status: InAppNotificationStatus;
  body: string;
}