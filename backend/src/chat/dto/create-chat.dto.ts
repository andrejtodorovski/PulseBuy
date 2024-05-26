export class CreateChatDto {
    content: string;
    cookie: string;
    // userId: number; TODO() - should we have userId if the user is logged in instead of the cookie?
    constructor(content: string, cookie: string) {
        this.content = content;
        this.cookie = cookie
    }
}
