import { interceptedFetch } from "../helpers/helpers";
import { SendMessageDto } from "../models/message";

class MessagesRepository {
    sendMessage = (message: SendMessageDto): Promise<Response> => {
        return interceptedFetch("/message", {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    getMessagesByCookie = (cookie: string): Promise<Response> => {
        return interceptedFetch(`/message/chat/by-cookie/${cookie}`, {});
    }

    getMessagesByUserId = (userId: string): Promise<Response> => {
        return interceptedFetch(`/message/chat/by-user-id/${userId}`, {});
    }
}

export default new MessagesRepository();
