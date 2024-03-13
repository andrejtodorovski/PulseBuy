import {interceptedFetch} from "../helpers/helpers";
import type { CreateCategorytDto } from "../models/category";

class CategoriesRepository {
    fetchCategories = (): Promise<Response> => {
        return interceptedFetch('http://localhost:3000/category/', {});
    }
    fetchCategorytById = (id: string): Promise<Response> => {
        return interceptedFetch(`http://localhost:3000/category/${id}`, {});
    }
    addNewCategory = (createCategoryDto: CreateCategorytDto): Promise<Response> => {
        return interceptedFetch("http://localhost:3000/category", {
            method: "POST",
            body: JSON.stringify(createCategoryDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export default new CategoriesRepository();