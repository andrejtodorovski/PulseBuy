export class MessageResponse {
    chatId: number;
    content: string;
    isAdminReply: boolean;

    constructor(chatId: number, content: string, isAdminReply: boolean) {
        this.chatId = chatId;
        this.content = content;
        this.isAdminReply = isAdminReply
    }
}