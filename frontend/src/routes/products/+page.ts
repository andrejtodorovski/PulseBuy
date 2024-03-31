import {goto} from "$app/navigation";
import {isUserLogged} from "../../helpers/helpers";
import ProductsRepository from "../../repository/productsRepository";

export async function load() {
    isUserLogged || goto('/login');
    const res = await ProductsRepository.fetchProducts()
    const products = await res.json()

    if (res.ok) {
        return {
            products: products
        }
    }

    return {
        products: [],
        status: res.status,
        error: new Error('Could not fetch the products.')
    }
}