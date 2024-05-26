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

    getMessages = (cookie: string): Promise<Response> => {
        return interceptedFetch(`/message/chat/${cookie}`, {});
    }
}

export default new MessagesRepository();
