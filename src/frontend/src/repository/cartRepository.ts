import { interceptedFetch } from "../helpers/helpers";
import { type CreateCartDto, CreateOrderInfo } from "../models/cart";

class CartRepository {
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
    orderCart = (id: string, orderInfo: CreateOrderInfo): Promise<Response> => {
        return interceptedFetch(`/cart/change-status/${id}`, {
            method: "PATCH",
            body: JSON.stringify(orderInfo),
            headers: {
                "Content-Type": "application/json",
            },
        });

    }
    getCartByUserOrdered = (id: string): Promise<Response> => {
        return interceptedFetch(`/cart/user/ordered/${id}`, {});
    }

    getAllOrderedCarts = (): Promise<Response> => {
        return interceptedFetch(`/cart/admin-orders`, {});
    }
}

export default new CartRepository();