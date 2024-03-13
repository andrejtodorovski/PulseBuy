export class CreateCartDto {
userId: number;

    constructor() {
        this.userId = 0;
    }
}

export interface Cart {
    id: number;
    status: string;

}
