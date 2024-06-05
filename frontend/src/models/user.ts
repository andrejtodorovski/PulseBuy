export class User {
    username: string;
    email: string;
    fullName: string;
    address: string;
    constructor(username:string, email:string, fullName:string, address:string) {
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.address = address;

    }
}