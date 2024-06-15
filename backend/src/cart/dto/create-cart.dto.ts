export class CreateCartDto {
    userId: number;

    constructor(userId: number) {
        this.userId = userId;
    }
}