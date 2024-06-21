export class CreateCategorytDto {
    name: string;
    description: string;

    constructor() {
        this.name = "";
        this.description = "";
    }
}

export interface Category {
    id: number;
    name: string;
    description: string;
}
