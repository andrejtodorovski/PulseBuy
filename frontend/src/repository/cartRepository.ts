import {interceptedFetch} from "../helpers/helpers";
import type { CreateCartDto } from "../models/cart";

class CartRepository {
    fetchCarttById = (id: string): Promise<Response> => {
        return interceptedFetch(`/cart/${id}`, {});
    }
    createCart = (createCartDto: CreateCartDto): Promise<Response> => {
        return interceptedFetch("/cart", {
            method: "POST",
            body: JSON.stringify(createCartDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    getCartByUser = (id: string): Promise<Response> => {
        return interceptedFetch(`/cart/user/${id}`, {});
    }
    orderCart = (id: string): Promise<Response> => {
        return interceptedFetch(`/cart/change-status/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

}
getCartByUserOrdered = (id: string): Promise<Response> => {
    return interceptedFetch(`/cart/user/ordered/${id}`, {});
}
}

export default new CartRepository();