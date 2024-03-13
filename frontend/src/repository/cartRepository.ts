import {interceptedFetch} from "../helpers/helpers";
import type { CreateCartDto } from "../models/cart";

class CartRepository {
    fetchCarttById = (id: string): Promise<Response> => {
        return interceptedFetch(`http://localhost:3000/cart/${id}`, {});
    }
    createCart = (createCartDto: CreateCartDto): Promise<Response> => {
        return interceptedFetch("http://localhost:3000/cart", {
            method: "POST",
            body: JSON.stringify(createCartDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    getCartByUser = (id: string): Promise<Response> => {
        return interceptedFetch(`http://localhost:3000/cart/user/${id}`, {});
    }
}

export default new CartRepository();