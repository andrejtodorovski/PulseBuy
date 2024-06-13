export class SendMessageDto {
    content: string;
    cookie: string | null;
    userId: string | null
    constructor(content: string, cookie: string | null, userId: string | null) {
        this.content = content;
        this.cookie = cookie
        this.userId = userId
    }
}
