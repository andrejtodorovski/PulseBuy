export class User {
    username: string;
    email: string;
    fullName: string;
    address: string;
    isAdmin: boolean;

    constructor(username: string, email: string, fullName: string, address: string, isAdmin: boolean) {
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.address = address;
        this.isAdmin = isAdmin
    }
}