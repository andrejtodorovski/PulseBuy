import {interceptedFetch} from "../helpers/helpers";

class CategoriesRepository {
    fetchCategories = (): Promise<Response> => {
        return interceptedFetch('http://localhost:3000/category/', {});
    }
}

export default new CategoriesRepository();