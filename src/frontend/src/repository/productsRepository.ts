import {interceptedFetch} from "../helpers/helpers";
import type {CreateProductDto} from "../models/products";
import {UpdateProductDto} from "../models/products";

class ProductsRepository {
    fetchProducts = (categoryId: string | null): Promise<Response> => {
        if (categoryId === null || categoryId === "" || categoryId === undefined) {
            return interceptedFetch("/product", {});
        }
        return interceptedFetch(`/product/by-category/${categoryId}`, {});
    }

    fetchFeaturedProducts = (): Promise<Response> => {
        return interceptedFetch("/product/featured", {});
    }

    fetchProductById = (id: string): Promise<Response> => {
        return interceptedFetch(`/product/${id}`, {});
    }

    addNewProduct = (createProductDto: CreateProductDto): Promise<Response> => {
        return interceptedFetch("/product", {
            method: "POST",
            body: JSON.stringify(createProductDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    updateProduct = (updateProductDto: UpdateProductDto, id: string): Promise<Response> => {
        return interceptedFetch(`/product/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateProductDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export default new ProductsRepository();