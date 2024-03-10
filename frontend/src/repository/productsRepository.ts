import {interceptedFetch} from "../helpers/helpers";
import type {CreateProductDto} from "../models/products";

class ProductsRepository {
    fetchProducts = () : Promise<Response> => {
        return interceptedFetch('http://localhost:3000/product/', {});
    }

    addNewProduct = (createProductDto: CreateProductDto) : Promise<Response> => {
        return interceptedFetch("http://localhost:3000/product", {
            method: "POST",
            body: JSON.stringify(createProductDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export default new ProductsRepository();