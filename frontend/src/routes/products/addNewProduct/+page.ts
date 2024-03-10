import CategoriesRepository from "../../../repository/categoriesRepository";

export async function load({ fetch, params }) {
    const res = await CategoriesRepository.fetchCategories()
    const categories = await res.json()

    if (res.ok) {
        return {
            categories: categories
        }
    }

    return {
        categories: [],
        status: res.status,
        error: new Error('Could not fetch the products.')
    }
}