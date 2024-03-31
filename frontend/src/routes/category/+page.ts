import { goto } from "$app/navigation";
import categoriesRepository from "../../repository/categoriesRepository";
import { isUserLogged } from "../../helpers/helpers";

export async function load() {

    const res = await categoriesRepository.fetchCategories()
    const categories = await res.json()

    if (res.ok) {
        return {
            categories: categories
        }
    }

    return {
        categories: [],
        status: res.status,
        error: new Error('Could not fetch the categories.')
    }
}