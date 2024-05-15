import {interceptedFetch} from "../helpers/helpers";
import type {CreateProductDto} from "../models/products";
import {UpdateProductDto} from "../models/products";

class ProductsRepository {
    fetchProducts = (): Promise<Response> => {
        return interceptedFetch('/product/', {});
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