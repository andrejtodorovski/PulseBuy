import { interceptedFetch } from "../helpers/helpers";

class NotificationManagerRepository {

  getNotificationsForUser = (userId: string): Promise<Response> => {
    return interceptedFetch(`/notification-manager/${userId}`, {});
  };

  markNotificationAsRead = (id: string): Promise<Response> => {
    return interceptedFetch(`/notification-manager/mark-as-read/${id}`, {});
  };

  markAllNotificationsAsRead = (userId: string): Promise<Response> => {
    return interceptedFetch(`/notification-manager/mark-all-as-read/${userId}`, {});
  };
}

export default new NotificationManagerRepository();