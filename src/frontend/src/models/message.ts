export class SendMessageDto {
    content: string;
    cookie: string | null;
    userId: string | null;
    isAdminReply: boolean;
    constructor(content: string, cookie: string | null, userId: string | null, isAdminReply: boolean = false) {
        this.content = content;
        this.cookie = cookie
        this.userId = userId
        this.isAdminReply = isAdminReply
    }
}

export class Message {
    content: string;
    isAdminReply: boolean;

    constructor(content: string, isAdminReply: boolean) {
        this.content = content;
        this.isAdminReply = isAdminReply;
    }
}

export class Chat {
    id: number;
    cookie: string;
    userId: string;
    userName: string;
    messages: Message[];

    constructor(id: number, cookie: string, userId: string,userName: string, messages: Message[]) {
        this.id = id;
        this.cookie = cookie;
        this.userId = userId;
        this.userName = userName;
        this.messages = messages;
    }
}