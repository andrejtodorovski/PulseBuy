import { interceptedFetch } from "../helpers/helpers";
import { type CreateCartItemDto, UpdateCartItemDto } from "../models/cart-item";

class CartItemRepository {
    getCartItem = (id: string): Promise<Response> => {
        return interceptedFetch(`/cart-item/${id}`, {});
    }
    createCartItem = (createCartItemDto: CreateCartItemDto): Promise<Response> => {
        return interceptedFetch("/cart-item", {
            method: "POST",
            body: JSON.stringify(createCartItemDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    getCartItemsByCartId = (id: string): Promise<Response> => {
        return interceptedFetch(`/cart-item/cart/${id}`, {});
    }

    deleteCartItem = (id: string): Promise<Response> => {
        return interceptedFetch(`/cart-item/${id}`, {
            method: "DELETE",
        });
    }

    updateCartItem = (id: string, updateCartItemDto: UpdateCartItemDto): Promise<Response> => {
        return interceptedFetch(`/cart-item/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateCartItemDto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export default new CartItemRepository();