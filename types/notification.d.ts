interface INotification {
    id: string;
    type: string;
    message: string;
    date: string;
}

export type IGetAllNotificationsResponse = INotification[];

export interface INotificationResponse {
    message: string;
}
