<script lang="ts">
    import "../styles/global.css";
    import type { Product } from "../models/products";
    import WishlistRepository from "../repository/wishlistRepository";
    import { toasts } from "svelte-toasts";
    import { CreateWishlistDto } from "../models/wishlist";
    import { getUserId } from "../helpers/helpers";

    export let product: Product;

    const addToWishlist = async () => {
        const userId = getUserId();
        if (!userId) {
            toasts.error("You need to be logged in to add products to wishlist");
            return;
        }
        let newWishlistItem = new CreateWishlistDto(
            userId as unknown as number,
            product.id
        );
        const response = await WishlistRepository.addToWishlist(newWishlistItem)
        if (response.ok) {
            toasts.success("Product added to wishlist");
        } else {
            const errorMessage = await response.json();
            toasts.error(errorMessage.message);

        }
    }
</script>

<div class="phone-card-link col-md-3">
    <div class="phone-card">
        <a href={`/products/${product.id}`}>
            <img
                    src="{product.imageURL}"
                    alt="{product.name}"
                    class="phone-image"
            />
            <div class="phone-info">
                <h4 class="brand-name">{product.name}</h4>
                <p class="model-name">{product.name}</p>
                {#if product.price.toString() === product.priceAfterDiscount.toString()}
                    <p class="price-before-sale">{product.price}MKD</p>
                {:else}
                    <p class="price-before-sale price-line-through">{product.price}MKD</p>
                    <p class="new-price">{product.priceAfterDiscount.toFixed(2)}MKD</p>
                {/if}
            </div>
        </a>
        <div class="phone-actions">
            <button class="cursor-pointer" on:click={addToWishlist}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-heart-fill"
                     viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            </button>
            <a href={`/products/${product.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-cart-fill"
                     viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
            </a>
        </div>
    </div>
</div>
