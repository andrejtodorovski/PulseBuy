export class CreateMessageDto {
    content: string;
    cookie: string | null;
    userId: string | null;
    isAdminReply: boolean;
    constructor(content: string, cookie: string | null, userId: string | null, isAdminReply: boolean) {
        this.content = content;
        this.cookie = cookie
        this.userId = userId
        this.isAdminReply = isAdminReply
    }
}
