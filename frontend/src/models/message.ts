export class SendMessageDto {
    content: string;
    cookie: string;
    constructor(content: string, cookie: string) {
        this.content = content;
        this.cookie = cookie
    }
}
