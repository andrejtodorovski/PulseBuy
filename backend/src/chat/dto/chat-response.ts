export class ChatResponse {
    id: number;
    cookie: string | null;
    userId: string | null;
    userName: string;

    constructor(id: number, cookie: string | null, userId: string | null, userName: string) {
        this.id = id;
        this.cookie = cookie
        this.userId = userId
        this.userName = userName
    }
}