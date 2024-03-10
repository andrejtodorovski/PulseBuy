import {Injectable} from '@nestjs/common';
import {Category} from "../models/category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {
    }

    async findAll() {
        return this.categoryRepository.find();
    }

    async findOne(id: number) {
        return this.categoryRepository.findOne({
            where: {id},
        });
    }
}
