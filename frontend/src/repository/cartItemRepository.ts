import {interceptedFetch} from "../helpers/helpers";
import type {CreateCartItemDto} from "../models/cart-item";

class CartItemRepository {
    getCartItem = (id: string): Promise<Response> => {
        return interceptedFetch(`http://localhost:3000/cart-item/${id}`, {});
    }
    createCartItem = (createCartItemDto: CreateCartItemDto): Promise<Response> => {
        return interceptedFetch("http://localhost:3000/cart-item", {
            method: "POST",
            body: JSON.stringify(createCartItemDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    getCartItemsByCartId = (id: string): Promise<Response> => {
        return interceptedFetch(`http://localhost:3000/cart-item/cart/${id}`, {});
    }
}

export default new CartItemRepository();