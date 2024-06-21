import { interceptedFetch } from "../helpers/helpers";
import type { CreateWishlistDto } from "../models/wishlist";

class WishlistRepository {
    addToWishlist = (wishlist: CreateWishlistDto): Promise<Response> => {
        return interceptedFetch("/wishlist", {
            method: "POST",
            body: JSON.stringify(wishlist),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    getWishlistForUserId = (userId: string): Promise<Response> => {
        return interceptedFetch(`/wishlist/${userId}`, {});
    }

    removeFromWishlist = (itemId: string): Promise<Response> => {
        return interceptedFetch(`/wishlist/${itemId}`, {
            method: "DELETE",
        });
    }
}

export default new WishlistRepository();
