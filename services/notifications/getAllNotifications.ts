import axios from "axios";
import type { IGetAllNotificationsResponse } from "../../types/notification";

/**
 * Makes a GET request to the API endpoint for all notifications.
 *
 * @returns A promise that resolves to the response data from the API.
 */
export async function getAllNotifications(): Promise<IGetAllNotificationsResponse> {
    const authToken = localStorage.getItem("burko");
    const response = await axios.get(
        `${useRuntimeConfig().public.apiMockLocal}/notifications`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }
    );
    return response.data;
}
